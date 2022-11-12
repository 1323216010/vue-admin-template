  // 定义一些公共的属性和方法
  const kkIp = 'http://120.46.176.87:8012'
  const fileUpload = kkIp + '/fileUpload';
  const onlinePreview = kkIp + '/onlinePreview?url=';
  const downloadFile = kkIp + '/demo/'
  const deleteFile = kkIp + '/deleteFile';
   // 暴露出这些属性
  export default {
    fileUpload,
    onlinePreview,
    downloadFile,
    deleteFile,
  }