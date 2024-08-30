export const getTimeElapsed = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentTime = new Date();
  

    if (isNaN(createdDate.getTime())) {
      return "Unable to determine time elapsed.";
    }
  

    const timeDifference = currentTime.getTime() - createdDate.getTime();
  
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  

    let unit;
    if (days > 0) {
      unit = days + (days > 1 ? " days" : " day");
    } else if (hours > 0) {
      unit = hours + (hours > 1 ? " hours" : " hour");
    } else if (minutes > 0) {
      unit = minutes + (minutes > 1 ? " minutes" : " minute");
    } else {
      unit = seconds + (seconds > 1 ? " seconds" : " second");
    }
  
    return unit;
  };