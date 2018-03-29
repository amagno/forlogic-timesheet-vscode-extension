'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "forlogic-timesheet" is now active!');
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);  
    let timer = new StatusTimer(statusBar);      
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableStart = vscode.commands.registerCommand('extension.startTimeSheet', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Timesheet Timer Começou !');
        timer.start();
        // StatusTimer.showTimer();s
    });
    let disposableStop = vscode.commands.registerCommand('extension.stopTimeSheet', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Timesheet Timer Parou: ' + timer.fomated);
        timer.stop();
        // StatusTimer.showTimer();s
    });

    context.subscriptions.push(disposableStart);
    context.subscriptions.push(disposableStop);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class StatusTimer {
    private seconds = 0;
    private minutes = 0;
    private hours = 0;
    private interval: any;
    constructor(private statusBar: vscode.StatusBarItem) {
    }
    private increment() {
        if (this.minutes === 59) {
            this.hours++;
            this.minutes = 0;
        }
        if (this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        }
        this.seconds++;        
    }
    start() {
        this.statusBar.show();
        this.interval = setInterval(() => {
            this.increment();
            this.statusBar.text = this.fomated;
        }, 1000);
    }
    stop() {
        clearInterval(this.interval);
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.statusBar.hide();
    }
    get time(): {
        seconds: number;
        minutes: number;
        hours: number;
    } {
        return {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours
        };
    }
    get fomated(): string {
        return 'Timesheet Timer: ' + (this.hours ? this.hours + ' horas ' : '') +
        (this.minutes ? this.minutes + ' minutos ' : '') +
        this.seconds + ' segundos ';
    }
}
