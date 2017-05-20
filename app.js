/**
 * Created by Administrator on 2017/5/19.
 */
(function(){

    function init() {

        var videoRecorder = new VideoRecorder();

        document.querySelector(".recoderButton").onclick = function () {
            videoRecorder.recorder();
        };

        document.querySelector(".stopButton").onclick = function () {
            videoRecorder.stop();
        };

    }

    init();
})();