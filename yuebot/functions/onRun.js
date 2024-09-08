module.exports = async (...runObj) => {
  if (!event.body) return;
  const config = global.Yue.config;
  const { PREFIX, ADMINS } = config;

  const [command, ...args] = event.body
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
};
