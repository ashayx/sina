var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingUI.prototype.init = function () {
        var _this = this;
        this.createView();
        RES.getResAsync('whitebg', function () {
            RES.getResAsync('loading.tip', function () {
                RES.getResAsync('loading.load', function () {
                    var bg = _this.createBitmap('whitebg');
                    bg.width = W;
                    bg.height = H;
                    var arm = _this.createBitmap('loading.arm', true);
                    arm.x = W * .5;
                    arm.y = H * .3;
                    egret.Tween.get(arm, { loop: true })
                        .to({ y: H * .3 - 20 }, 600, egret.Ease.cubicInOut)
                        .to({ y: H * .3 }, 600, egret.Ease.cubicInOut);
                    var dian = _this.createBitmap('loading.dian', true);
                    dian.x = W * .5;
                    dian.y = arm.y + arm.height / 2 + 30;
                    egret.Tween.get(dian, { loop: true })
                        .to({ alpha: 0 }, 600, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 600, egret.Ease.cubicInOut);
                    var load = _this.createBitmap('loading.load', true);
                    load.x = W * .5;
                    load.y = H * .5;
                    var loaddian = _this.createBitmap('loading.loaddian');
                    loaddian.x = load.x + load.width / 2 + 10;
                    loaddian.y = H * .5;
                    var square = new egret.Shape();
                    square.graphics.beginFill(0x0000ff);
                    square.graphics.drawRect(loaddian.x - loaddian.width, loaddian.y, loaddian.width + 100, loaddian.height);
                    square.graphics.endFill();
                    egret.Tween.get(square, { loop: true })
                        .to({ x: loaddian.x - loaddian.width - 100 }, 1000)
                        .to({ x: loaddian.x }, 1000);
                    loaddian.mask = square;
                    _this.addChild(bg);
                    _this.addChild(arm);
                    _this.addChild(dian);
                    _this.addChild(load);
                    _this.addChild(square);
                    _this.addChild(loaddian);
                    RES.loadGroup("preload");
                }, _this);
            }, _this);
        }, this);
    };
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.textField.width = this.width;
        this.textField.height = 100;
        this.textField.anchorOffsetX = this.textField.width / 2;
        this.textField.anchorOffsetY = this.textField.height / 2;
        this.textField.x = this.width * .5;
        this.textField.textColor = 0x000000;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = (Math.floor(current / total * 100)) + "%";
    };
    return LoadingUI;
}(Page));
__reflect(LoadingUI.prototype, "LoadingUI");
