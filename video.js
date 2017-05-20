/**
 * Created by Administrator on 2017/5/19.
 */
(function(){

    function VideoRecorder() {

        this.getMediaStream();
    }

    VideoRecorder.prototype.getMediaStream = function () {

        var config = {audio:true,video:true};

        var self = this;

        this.buffers = [];

        navigator.mediaDevices.getUserMedia(config).then(function (stream) {

            self.mediaRecoder = new MediaRecorder(stream);

            self.mediaRecoder.ondataavailable = function (event) {
                self.buffers.push(event.data);

            };

            self.mediaRecoder.onstart = function () {

                self.video = document.createElement("video");

                self.video.src = window.URL && window.URL.createObjectURL(stream) || stream;
                document.body.appendChild(self.video);
                self.video.autoplay = true;
            };

            self.addEventListener();
        }).catch(function (error) {
            console.log(error);
        });
    };

    VideoRecorder.prototype.addEventListener = function () {
        var self = this;

        this.mediaRecoder.onstop = function () {
            self.blob = new Blob(self.buffers,{type:"video/mp4"});
            self.url = URL.createObjectURL(self.blob);
            var downloadButton = document.querySelector(".download");
            downloadButton.href = self.url;
            downloadButton.download = self.url;
            document.body.appendChild(downloadButton);
            document.body.removeChild(self.video);
        };

    };

    VideoRecorder.prototype.recorder = function () {
        if (this.mediaRecoder.state == "recording"){
            return;
        }else if(this.mediaRecoder.state == "paused"){
            this.mediaRecoder.resume();
        }else if(this.mediaRecoder.state == "inactive"){
            this.mediaRecoder.start();
        }
    };

    VideoRecorder.prototype.stop = function () {
        if(this.mediaRecoder.state == "recording"){
            this.mediaRecoder.stop();
        }
    };

    window.VideoRecorder = VideoRecorder;

})();