import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseErrorMessage } from "../../helpers/parseErrMsg.helper";
import { axiosInstance } from "../../helpers/axios.helper";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  status: false,
  data: [],
};

export const createTweet = createAsyncThunk("tweet/createTweet", async ( content ) => {
  try {
    console.log("Sending content:",  content );

    const response = await axiosInstance.post(`/tweets/create-tweet`, content );

    return response.data.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(parseErrorMessage(error.response?.data || error.message));
    throw error;
  }
});


export const getTweet = createAsyncThunk("tweet/getTweet", async (userId) => {
  try {
    const response = await axiosInstance.get(`/tweets/user/${userId}`);
    return response.data.data;
  } 
  catch (error) {
    toast.error(parseErrorMessage(error.response.data));
    console.log(error);
    throw error;
  }
});


export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
  try {
    const response = await axiosInstance.get(`/tweets`);
    //toast.success(response.data.message);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    toast.error(parseErrorMessage(error.response.data));
    console.log(error);
    throw error;
  }
});


// export const getAllUserFeedTweets = createAsyncThunk("tweet/getAllUserFeedTweets", async () => {
//   try {
//     const response = await axiosInstance.get(`/tweets/feed`);
//     //toast.success(response.data.message);
//     return response.data.data;
//   } catch (error) {
//     toast.error(parseErrorMessage(error.response.data));
//     console.log(error);
//     throw error;
//   }
// });


export const updateTweet = createAsyncThunk("tweet/updateTweet", async ({ tweetId, data }) => {
  try {
    const response = await axiosInstance.patch(`/tweets/${tweetId}`, data);
    return response.data.data;
  } 
  catch (error) {
    toast.error(parseErrorMessage(error.response.data));
    console.log(error);
    throw error;
  }
});


export const deleteTweet = createAsyncThunk("tweet/deleteTweet", async ({ tweetId }) => {
  try {
    const response = await axiosInstance.delete(`/tweets/${tweetId}`);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    toast.error(parseErrorMessage(error.response.data));
    console.log(error);
    throw error;
  }
});


const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  extraReducers: (builder) => {
    // create tweet
    builder.addCase(createTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.loading = false;
      if (!Array.isArray(state.data)) {
        state.data = []; // Ensure data is an array
      }
      state.data.unshift(action.payload);
      console.log("")
      state.status = true;
    });
    builder.addCase(createTweet.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

    // get User tweet
    builder.addCase(getTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTweet.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = true;
    });
    builder.addCase(getTweet.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });
    
    //get All User Feed Tweets
    builder.addCase(getAllTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("state data in get req",state.data)
      state.status = true;
    });
    builder.addCase(getAllTweets.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });


    // Update tweet
    builder.addCase(updateTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTweet.fulfilled, (state, action) => {
      state.loading = false;
      // state.data = action.payload;
      state.status = true;
    });
    builder.addCase(updateTweet.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

    // delete tweet
    builder.addCase(deleteTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      state.loading = false;
      console.log("delete tweet:",action.payload);
      console.log("delete tweet state:",state);
      // state.loading = false;

      // Ensure the state's data isn't empty before filtering
      if (state.data && state.data.length > 0) {
        let filteredTweets = state.data.filter((tweet) => tweet._id !== action.payload._id);
        state.data = filteredTweets;
      }
    
      state.status = true;
    });
    builder.addCase(deleteTweet.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

  },
});

export default tweetSlice.reducer;