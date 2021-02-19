<template>
  <div class="content">
    <uploader
      :options="options"
      class="uploader-example"
      @file-success="onFileSuccess"
      @file-complete='fileComplete'
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>拖拽到这里上传或</p>
        <!-- <uploader-btn>选择文件</uploader-btn>
        <uploader-btn :attrs="attrs">选择图片</uploader-btn> -->
        <uploader-btn :directory="true">选择文件夹</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
    <button @click="toBack">返回</button>
  </div>
</template>

<script>
var baseUrl = "";
export default {
  data() {
    return {
      options: {
        target: "", //SpringBoot后台接收文件夹数据的接口
        testChunks: false, //是否开启服务器分片校验
        chunkSize: "2048000", //分块大小2M(大文件自动分块上传)
        fileParameterName: "uploadFiles", //上传文件时文件的参数名，默认file
        query: { diagnoseId: "" } //包含在多部分POST中的额外参数和数据,默认值：{}
        //simultaneousUploads: 3 //同时上传数
      },
      attrs: {
        accept: "image/*"
      },
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      diagnoseId: "", //标记id
      action: "" //标记返回页面
    };
  },
  created() {
    /*上传文件路径*/
    var url = "";
    switch (process.env.NODE_ENV) {
      case "development":
        url =   "http://172.16.0.115:8115/Platform_N/pacs/technician/uploadPacsFilesBatch"; //【开发环境】
        break;
      case "production":
        url = this.baseUrl + "/Platform_N/pacs/technician/uploadPacsFilesBatch"; //SpringBoot后台接收文件夹数据的接口【生产环境】
        break;
    }
    this.options.target = url;
    console.log("目前上传路径：" + url);

    /*标记id*/
    this.diagnoseId = this.$route.query.diagnoseId;
    this.action = this.$route.query.fun;

    this.diagnoseId = this.diagnoseId ? this.diagnoseId : "";
    this.action = this.action ? this.action : "";
    this.options.query = { diagnoseId: this.diagnoseId };
  },
  methods: {
    onFileSuccess: function(rootFile, file, response, chunk) {
      console.log(JSON.parse(response));
      console.log("上传文件");
      //这里可以根据response（接口）返回的数据处理自己的实际问题（如：从response拿到后台返回的想要的数据进行组装并显示）
      //注，这里从文件夹每上传成功一个文件会调用一次这个方法
    },
    //根文件（文件夹）已完成
    fileComplete(rootFile) {
      console.log("上传完毕");
    },
    toBack: function() {
      var url = "";
      switch (this.action) {
        case "add":
           url =
            window.location.origin +
            "/Platform_N/pacs/technician/to/addPacsInfo?diagnoseId=" +
            this.diagnoseId +
            "&step=1";
          break;
        case "update":
          url =
            window.location.origin +
            "/Platform_N/pacs/technician/to/updatePacsInfo?diagnoseId=" +
            this.diagnoseId +
            "&step=1";
          break;
      }

      console.log("返回地址" + url);

      window.location.href = url;
    }
  }
};
</script>


<style>
.uploader-example {
  width: 90%;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.uploader-example .uploader-btn {
  margin-right: 4px;
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.uploader-drop {
  text-align: left;
}
.uploader-file-info {
  text-align: left;
}
button {
  padding: 10px;
  border: 0;
  background: #4faeff;
  color: white;
  margin: 50px;
  cursor: pointer;
  border-radius: 3px;
  width: 80px;
  font-size: 16px;
}
</style>