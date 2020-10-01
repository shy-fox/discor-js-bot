require('typescript-require');

const {
    CommandManager,
    FullCommand,
    Command
} = require('./base.ts');

const cmds = [new FullCommand(new Command('kill', "Kills the tagged user.", "kill <user>", "<user>"))];

const manager = new CommandManager(cmds);

manager.execute(cmds[0].command, a => {
    console.log(`$${cmds[0].command.command} | ${cmds[0].command.description} | Usage: ${cmds[0].command.usage}`);
});