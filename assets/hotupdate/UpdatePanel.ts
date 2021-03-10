
import { _decorator, Component, Node, Label, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UpdatePanel')
export class UpdatePanel extends Component {

    @property(Label)
    info: Label = null!;

    @property(ProgressBar)
    fileProgress: ProgressBar = null!;

    @property(Label)
    fileLabel: Label = null!;
    @property(ProgressBar)
    byteProgress: ProgressBar = null!;

    @property(Label)
    byteLabel: Label = null!;

    @property(Node)
    close: Node = null!;

    @property(Node)
    checkBtn: Node = null!;

    @property(Node)
    retryBtn: Node = null!;

    @property(Node)
    updateBtn: Node = null!;

    onLoad() {

    }
};
