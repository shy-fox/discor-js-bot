type ManagerType = "command"|"game"|"object"|"string"|"activity";

export class BaseManager {
    public readonly id: string;
    public type?: ManagerType;
}

export class CommandManager extends BaseManager {
    public readonly id: string;

    public readonly commands: FullCommand[];

    constructor(commands:FullCommand[]) {
        super();
        this.type = "command"
        this.commands = commands;
    }

    public execute(cmd:Command, listener:(args?:any[]|any) => void):void {
        this.commands.find(c => c.name === cmd.command).command.exec(listener);
    }
}

export class Command {
    public readonly command:string;
    public readonly description:string;
    public readonly usage:string;
    public readonly args?:any[]|any;

    constructor(command:string, description:string, usage?:string, args?:any[]|any) {
        this.command = command;
        this.description = description;
        this.usage = usage ? usage : command;
        this.args = args ? args : null;
    }

    public exec(listener:(args?:any[]|any) => void):void {
        listener(this.args);
    }
}

export class FullCommand {

    readonly command: Command;
    readonly name: string;

    constructor(command:Command) {
        this.command = command;
        this.name = command.command;
    }
}