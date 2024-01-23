module.exports = ({ target, commandName, commands, approve, reject }) => {
  if (!target.config) reject(`Missing config`);
  else approve(target.config.name, target);
};