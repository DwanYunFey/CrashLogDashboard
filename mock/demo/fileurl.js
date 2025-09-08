export default [
    {
        url: '/GeneratePresignedURL',
        method: 'post',
        response: () => {
          return {
            code: 20000,
            data: "https://cnbj1.fds.api.xiaomi.com/xiaomi-ov21cn/2025%2F02%2F24%2F1406364413%2F1064893345_111036366.bin?Expires=1740398232956&GalaxyAccessKeyId=AKZFOJEUKXZBGEUAXW&Signature=0fvrtD9H4E3e8G90r5j/wYdW59g=",
            msg:"OK"
          };
        }
      },
]