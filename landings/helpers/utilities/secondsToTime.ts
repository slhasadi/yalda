export default (seconds: number, video_time = true) => {
  let date = new Date(0);
  date.setSeconds(seconds);
  let time = date.toISOString().substr(11, 8);
  if (video_time) {
    time = time.replace("00:", "");
  }
  return time;
};
