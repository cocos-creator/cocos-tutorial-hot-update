
import { _decorator, Component, Node, Label, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UpdatePanel')
export class UpdatePanel extends Component {

    @property(Label)
    info: Label = <any>null;

    @property(ProgressBar)
    fileProgress: ProgressBar = <any>null;

    @property(Label)
    fileLabel: Label = <any>null;
    @property(ProgressBar)
    byteProgress: ProgressBar = <any>null;

    @property(Label)
    byteLabel: Label = <any>null;

    @property(Node)
    close: Node = <any>null;

    @property(Node)
    checkBtn: Node = <any>null;

    @property(Node)
    retryBtn: Node = <any>null;

    @property(Node)
    updateBtn: Node = <any>null;

    onLoad() {

    }
};
