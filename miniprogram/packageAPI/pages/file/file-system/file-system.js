import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['file-system0'],
      path: 'packageAPI/pages/file/file-system/file-system',
      containerStyle1: ''
    }
  },
  showInputDialog(options) {
    const op = Object.assign({
      cancelText: i18n['file-system1'],
      confirmText: i18n['file-system2']
    }, options);
    op.show = true;
    this.setData({
      inputOptions: op
    });
  },
  onInutCancel() {
    this.setData({
      'inputOptions.show': false
    });
    this.data.inputOptions.onCancel();
  },
  onInputConfirm(e) {
    this.setData({
      'inputOptions.show': false
    });
    this.data.inputOptions.onConfirm(e.detail.value);
  },
  data: {
    inputOptions: {
      show: false,
      title: '',
      inputs: [],
      placeholder: '',
      cancelText: i18n['file-system1'],
      confirmText: i18n['file-system2'],
      onCancel: () => { },
      onConfirm: () => { }
    },
    theme: 'light',
    fileName: 'hello_world.txt',
    fileNameCopy: 'hello_world_cp.txt',
    fileNameOld: 'hello_world.txt',
    fileNameNew: 'hello_world_1.txt',
    fileSize: '--',
    fileList: [],
    dir: 'test',
    isFile: '--',
    isDir: '--',
    zipPath: '--',
    zipDir: 'temp',
    hasCreateFile: false,
    fileFD: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Forward']
    })
    this.setData({
      t: i18n,
      lang
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

  },
  openFile() {
    const path = `${wx.env.USER_DATA_PATH}`;
    this.showInputDialog({
      title: i18n['file-system3'],
      inputs: [
        {
          key: 'fileName',
          name: 'fileName',
          placeholder: this.data.fileName
        },
        {
          key: 'flag',
          name: 'flag',
          placeholder: 'r+'
        }
      ],
      onConfirm: (res) => {
        console.log('res:', res);
        const fs = wx.getFileSystemManager()
        fs.open({
          filePath: `${path}/${res.fileName || this.data.fileName}`,
          flag: res.flag || 'r+',
          success: (reslut) => {
            console.log('success result:', reslut);
            this.setData({
              fileFD: reslut.fd
            })
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: JSON.stringify(reslut),
              showCancel: false,
              title: i18n['file-system4']
            })
          },
          fail: (reslut) => {
            console.log('fail result:', reslut);
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: JSON.stringify(reslut),
              showCancel: false,
              title: i18n['file-system4']
            })
          }
        })
      }
    });
  },
  openFileSync() {
    const path = `${wx.env.USER_DATA_PATH}`;
    this.showInputDialog({
      title: i18n['file-system3'],
      inputs: [
        {
          key: 'fileName',
          name: 'fileName',
          placeholder: this.data.fileName
        },
        {
          key: 'flag',
          name: 'flag',
          placeholder: 'r+'
        }
      ],
      onConfirm: (res) => {
        console.log('res:', res);
        const fs = wx.getFileSystemManager()
        try {
          const reslut = fs.openSync({
            filePath: `${path}/${res.fileName || this.data.fileName}`,
            flag: res.flag || 'r+'
          })
          this.setData({
            fileFD: reslut
          })
          console.log('openSync:', reslut);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: reslut,
            showCancel: false,
            title: i18n['file-system4']
          })
        } catch (e) {
          console.log('openSync:', e);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: e.message,
            showCancel: false,
            title: i18n['file-system4']
          })
        }

      }
    });
  },
  writeFileByFd() {
    const defaultContent = 'Test file writing，Ha ha ha ha ha ha ha ha'
    this.showInputDialog({
      title: i18n['file-system3'],
      inputs: [
        {
          key: 'content',
          name: i18n['file-system5'],
          placeholder: defaultContent
        }
      ],
      onConfirm: (res) => {
        console.log('res:', res, this.data.fileFD);
        const fs = wx.getFileSystemManager()
        fs.write({
          fd: this.data.fileFD,
          data: res.content || defaultContent,
          encoding: 'utf8',
          success: (reslut) => {
            console.log('success result:', reslut);
            // wx.openDocument({
            //   filePath: `${wx.env.USER_DATA_PATH}/${this.data.fileName}`,
            //   fileType: 'doc',
            //   success: (res) => {
            // console.log('Document opened successfully', res)
            //   }
            // })
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: JSON.stringify(reslut),
              showCancel: false,
              title: i18n['file-system4']
            })
          },
          fail: (reslut) => {
            console.log('fail result:', reslut);
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: JSON.stringify(reslut),
              showCancel: false,
              title: i18n['file-system4']
            })
          }
        })
      }
    });
  },
  writeFileByFdSync() {
    const defaultContent = 'Test file writing，Ha ha ha ha ha ha ha ha'
    this.showInputDialog({
      title: i18n['file-system3'],
      inputs: [
        {
          key: 'content',
          name: i18n['file-system5'],
          placeholder: defaultContent
        }
      ],
      onConfirm: (res) => {
        console.log('res:', res, this.data.fileFD);
        const fs = wx.getFileSystemManager()
        try {
          const result = fs.writeSync({
            fd: this.data.fileFD,
            data: res.content || defaultContent,
            encoding: 'utf8'
          })
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: JSON.stringify(result),
            showCancel: false,
            title: i18n['file-system4']
          })
          // wx.openDocument({
          //     filePath: `${wx.env.USER_DATA_PATH}/${this.data.fileName}`,
          //     fileType: 'doc',
          //     success: (res) => {
          // console.log('Document opened successfully', res)
          //     }
          //   })
          console.log('fail result:', result);
        } catch (error) {
          console.log('fail result:', error);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: error.message,
            showCancel: false,
            title: i18n['file-system4']
          })
        }

      }
    });

  },
  readFileByFd() {
    const fs = wx.getFileSystemManager();
    const buff = new ArrayBuffer(200);
    fs.read({
      fd: this.data.fileFD,
      arrayBuffer: buff,
      offset: 0,
      length: 200,
      position: 0,
      success: (res) => {
        console.log('res:', res);
        //  const decoder = new TextDecoder('utf-8');
        // const str = decoder.decode(res.arrayBuffer);
        const str = this.readArrayBuffer(res.arrayBuffer);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: str,
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      fail: (res) => {
        console.log('res:', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      }
    })
  },
  readFileByFdSync() {
    const fs = wx.getFileSystemManager();
    const buff = new ArrayBuffer(200);
    try {
      const reslut = fs.readSync({
        fd: this.data.fileFD,
        arrayBuffer: buff,
        offset: 0,
        length: 200,
        position: 0
      })
      console.log('reslut:', reslut);
      //const decoder = new TextDecoder('utf-8');
      //const str = decoder.decode(reslut.arrayBuffer);
      const str = this.readArrayBuffer(reslut.arrayBuffer);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: str,
        showCancel: false,
        title: i18n['file-system4']
      })
    } catch (error) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: error.message,
        showCancel: false,
        title: i18n['file-system4']
      })
    }

  },
  truncateFileByFdSync() {
    const fs = wx.getFileSystemManager();
    try {
      const result = fs.ftruncateSync({
        fd: this.data.fileFD,
        length: 6
      })
      console.log('result', result);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: JSON.stringify(result),
        showCancel: false,
        title: i18n['file-system4']
      })
    } catch (error) {
      console.log('error:', error);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: error.message,
        showCancel: false,
        title: i18n['file-system4']
      })
    }
  },
  truncateFileByFd() {
    const fs = wx.getFileSystemManager();
    fs.ftruncate({
      fd: this.data.fileFD,
      length: 6,
      success: (res) => {
        console.log('res:', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      fail: (res) => {
        console.log('res:', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      }
    });
  },
  fileStatByFd() {
    const fs = wx.getFileSystemManager();
    fs.fstat({
      fd: this.data.fileFD,
      success: (res) => {
        console.log('res:', res, res.stats.isFile(), res.stats.isDirectory());
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      fail: (res) => {
        console.log('res:', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      }
    })
  },
  fileStatByFdSync() {
    const fs = wx.getFileSystemManager();
    try {
      const result = fs.fstatSync({ fd: this.data.fileFD });
      console.log('result:', result, result.isFile(), result.isDirectory());
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: JSON.stringify(result),
        showCancel: false,
        title: i18n['file-system4']
      })
    } catch (error) {
      console.log('error:', error);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: error.message,
        showCancel: false,
        title: i18n['file-system4']
      })
    }
  },
  closeFileByFd() {
    const fs = wx.getFileSystemManager();
    fs.close({
      fd: this.data.fileFD,
      success: (res) => {
        console.log('res:', res);
        this.setData(
          {
            fileFD: ''
          }
        )
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      fail: (res) => {
        console.log('res:', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(res),
          showCancel: false,
          title: i18n['file-system4']
        })
      }
    })
  },
  closeFileByFdSync() {
    const fs = wx.getFileSystemManager();
    try {
      const result = fs.closeSync({ fd: this.data.fileFD });
      console.log('result:', result);
      this.setData(
        {
          fileFD: ''
        }
      )
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: JSON.stringify(result),
        showCancel: false,
        title: i18n['file-system4']
      })
    } catch (error) {
      console.log('error:', error);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        content: error.message,
        showCancel: false,
        title: i18n['file-system4']
      })
    }
  },
  accessFn(name) {
    const fs = wx.getFileSystemManager()
    fs.access({
      path: `${wx.env.USER_DATA_PATH}/${name}`,
      success: (res) => {
        wx.showToast({
          title: i18n['file-system32'],
          icon: 'success',
          mask: true
        })
        console.log(res)
      },
      fail: (res) => {
        wx.showToast({
          title: i18n['file-system6'],
          icon: 'none',
          mask: true
        })
        console.error(res)
      }
    })
  },
  access() {
    const { fileName } = this.data
    this.accessFn(fileName)
  },
  accessSync() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    try {
      fs.accessSync(`${wx.env.USER_DATA_PATH}/${fileName}`)
      wx.showToast({
        title: i18n['file-system7'],
        icon: 'success',
        mask: true
      })
    } catch (e) {
      wx.showToast({
        title: i18n['file-system8'],
        icon: 'error',
        mask: true
      })
      console.error(e)
    }
  },
  readFile() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    fs.readFile({
      filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      encoding: 'utf8',
      position: 0,
      success: (res) => {
        console.log('Read successful', res)
        wx.showToast({
          title: i18n['file-system9'],
          icon: 'success',
          mask: true
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.error('Read failed', res)
      }
    })
  },
  readFileSync() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.readFileSync(
        `${wx.env.USER_DATA_PATH}/${fileName}`,
        'utf8',
        0
      )
      wx.showToast({
        title: i18n['file-system9'],
        icon: 'success',
        mask: true
      })
      console.log('Read successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system10'],
        icon: 'none',
        mask: true
      })
      console.log('Read failed', e)
    }
  },
  readBrotliFileSync() {
    wx.downloadFile({
      url: 'https://pkg-manager-1314481471.cos.ap-beijing.myqcloud.com/devops/compressed.br',
      success: (res) => {
        const tempFilePath = res.tempFilePath;
        const fs = wx.getFileSystemManager()
        // const filePath = '/image/compressed.br';
        try {
          const reslut = fs.readCompressedFileSync({
            filePath: tempFilePath,
            compressionAlgorithm: 'br'
          })
          // const decoder = new TextDecoder('utf-8');
          // const str = decoder.decode(reslut);
          console.log('reslut:', reslut);
          const str = this.readArrayBuffer(reslut);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: str,
            showCancel: false,
            title: i18n['file-system4']
          })
        } catch (e) {
          console.log('error', e);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            content: e.message,
            showCancel: false,
            title: i18n['file-system4']
          })
        }
      }
    })
  },
  readBrotliPackageFile() {
    const fs = wx.getFileSystemManager()
    fs.readCompressedFile({
      filePath: '/common/compressed.br',
      compressionAlgorithm: 'br',
      success: (reslut) => {
        // const decoder = new TextDecoder('utf-8');
        // const str = decoder.decode(reslut.data);
        const str = this.readArrayBuffer(reslut.data);
        console.log('reslut:', reslut);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: str,
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      fail: (reslut) => {
        console.log('reslut:', reslut);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          content: JSON.stringify(reslut),
          showCancel: false,
          title: i18n['file-system4']
        })
      },
      complete: (res) => {
        console.log('complete', res);
      }
    })
  },
  readBrotliFile() {
    const fs = wx.getFileSystemManager()
    wx.downloadFile({
      url: 'https://pkg-manager-1314481471.cos.ap-beijing.myqcloud.com/devops/compressed.br',
      success: (res) => {
        const tempFilePath = res.tempFilePath;
        fs.readCompressedFile({
          filePath: tempFilePath,
          compressionAlgorithm: 'br',
          success: (reslut) => {
            // const decoder = new TextDecoder('utf-8');
            // const str = decoder.decode(reslut.data);
            const str = this.readArrayBuffer(reslut.data);
            console.log('reslut:', reslut);
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: str,
              showCancel: false,
              title: i18n['file-system4']
            })
          },
          fail: (reslut) => {
            console.log('reslut:', reslut);
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              content: JSON.stringify(reslut),
              showCancel: false,
              title: i18n['file-system4']
            })
          },
          complete: (res) => {
            console.log('complete', res);
          }
        })

      }
    })
  },
  readZipFileContent() {
    this.showInputDialog({
      title: i18n['file-system33'],
      inputs: [
        {
          key: 'encoding',
          name: i18n['file-system34'],
          placeholder: 'undefined'
        },
        {
          key: 'all',
          name: i18n['file-system35'],
          placeholder: 'yes'
        }
      ],
      onConfirm: (res) => {

        const key = 'doc-master/Test text.pdf';
        const encoding = res.encoding || undefined;
        let entries = 'all';
        if (res.all && res.all !== 'yes') {
          entries = [{ path: key }]
        }
        wx.downloadFile({
          url: 'https://codeload.github.com/wuguofang/doc/zip/refs/heads/master',
          success: (res) => {
            const tempFilePath = res.tempFilePath;
            console.log('tempFilePath:', tempFilePath);
            const fs = wx.getFileSystemManager()
            // const filePath =  'image/doc-master.zip';

            fs.readZipEntry({
              filePath: tempFilePath,
              encoding: encoding,
              entries: entries,
              //entries: [{ path: key }],
              success: (reslut) => {
                console.log('reslut:', reslut);
                //const decoder = new TextDecoder('utf-8');
                //const str = decoder.decode(reslut.data);
                // const content = this.readArrayBuffer(reslut.entries[key].data);
                wx.showModal({
                  confirmText: i18n['confirm'],
                  cancelText: i18n['cancel'],
                  content: JSON.stringify(reslut),
                  // content: content,
                  showCancel: false,
                  title: i18n['file-system4']
                })
              },
              fail: (reslut) => {
                console.log('reslut:', reslut);
                wx.showModal({
                  confirmText: i18n['confirm'],
                  cancelText: i18n['cancel'],
                  content: JSON.stringify(reslut),
                  showCancel: false,
                  title: i18n['file-system4']
                })
              }
            })

          }
        })
      }
    });


  },
  readArrayBuffer(buffer) {
    console.log('readArrayBuff:', buffer);
    // var dataview = new DataView(buffer);
    // var ints = new Uint8Array(buffer.byteLength);
    // var str = '';
    // for (var i = 0; i < ints.length; i++) {
    //   str += String.fromCharCode(dataview.getUint8(i));
    // }
    // const str = String.fromCharCode.apply(null, new Uint16Array(buffer));
    const str = decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(buffer))));
    console.log('srt:', str);
    return str;
  },
  writeFile() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    console.log('fs:', fs);
    fs.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      data: 'this is a test file1 this is a test file2 this is a test file3 this is a test file4',
      encoding: 'utf8',
      success: res => {
        this.setData(
          {
            hasCreateFile: true
          }
        );
        wx.showToast({
          title: i18n['file-system11'],
          icon: 'success',
          mask: true
        })
        console.log('Write successful', res)
      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.log('Write failed', res)
      }
    });
  },
  writeFileSync() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.writeFileSync(
        `${wx.env.USER_DATA_PATH}/${fileName}`,
        'this is a test file(sync)',
        'utf8'
      )
      wx.showToast({
        title: i18n['file-system11'],
        icon: 'success',
        mask: true
      })
      this.setData(
        {
          hasCreateFile: true
        }
      );
      console.log('Write successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system36'],
        icon: 'none',
        mask: true
      })
      console.log('Write failed', e)
    }
  },
  truncateFile() {
    const fs = wx.getFileSystemManager()
    const path = `${wx.env.USER_DATA_PATH}/${this.data.fileName}`;
    fs.truncate({
      filePath: path,
      length: 10,
      success: res => {
        const result = fs.readFileSync(
          path, 'utf8', 0
        )
        console.log('File truncation successful', res, result)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['file-system4'],
          content: result
        })
      },
      fail: res => {
        wx.showToast({
          title: i18n['file-system12'],
          icon: 'none',
          mask: true
        })
        console.log('File truncation failed', res)
      }
    });
  },
  truncateFileSync() {
    const fs = wx.getFileSystemManager()
    try {
      const path = `${wx.env.USER_DATA_PATH}/${this.data.fileName}`;
      const res = fs.truncateSync(
        {
          filePath: path,
          length: 10
        }
      )
      const result = fs.readFileSync(
        path, 'utf8', 0
      )
      console.log('File truncation successful', res, result)
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['file-system4'],
        content: result
      })
    } catch (e) {
      wx.showToast({
        title: i18n['file-system12'],
        icon: 'none',
        mask: true
      })
      console.log('File truncation failed', e)
    }
  },
  unlinkFile() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    fs.unlink({
      filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      success: res => {
        wx.showToast({
          title: i18n['file-system13'],
          icon: 'success',
          mask: true
        })
        this.setData(
          {
            hasCreateFile: false
          }
        );
        console.log('Deletion successful', res)
      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.log('Deletion failed', res)
      }
    });
  },
  unlinkFileSync() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.unlinkSync(
        `${wx.env.USER_DATA_PATH}/${fileName}`,
      )
      wx.showToast({
        title: i18n['file-system13'],
        icon: 'success',
        mask: true
      })
      console.log('Deletion successful', res)
      this.setData(
        {
          hasCreateFile: false
        }
      );
    } catch (e) {
      wx.showToast({
        title: String(e),
        icon: 'none',
        mask: true
      })
      console.log('Deletion failed', e);
    }
  },
  appendFile() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    fs.appendFile({
      filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      data: new Date(),
      encoding: 'utf8',
      success: (res) => {
        wx.showToast({
          title: i18n['file-system14'],
          icon: 'success',
          mask: true
        })
        wx.openDocument({
          filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
          fileType: 'doc',
          success: (res) => {
            console.log('Open document successful', res)
          }
        })
        console.log('Addition successful', res)
      },
      fail: (res) => {
        wx.showToast({
          title: i18n['file-system15'],
          icon: 'none',
          mask: true
        })
        console.error('Addition failed', res)
      }
    })
  },
  appendFileSync() {
    const { fileName } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.appendFileSync(
        `${wx.env.USER_DATA_PATH}/${fileName}`,
        `${new Date()} (sync)`,
        'utf8'
      )
      wx.showToast({
        title: i18n['file-system14'],
        icon: 'success',
        mask: true
      })
      wx.openDocument({
        filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
        fileType: 'doc',
        success: (res) => {
          console.log('Open document successful', res)
        }
      })
      console.log('Addition successful', res)
    } catch (e) {
      wx.showToast({
        title: 'add failed',
        icon: 'none',
        mask: true
      })
      console.log('Addition failed', e)
    }
  },
  rename() {
    const fs = wx.getFileSystemManager()
    const { fileNameOld, fileNameNew } = this.data
    fs.rename({
      oldPath: `${wx.env.USER_DATA_PATH}/${fileNameOld}`,
      newPath: `${wx.env.USER_DATA_PATH}/${fileNameNew}`,
      success: (res) => {
        wx.showToast({
          title: i18n['file-system16'],
          icon: 'success',
          mask: true
        })
        this.setData({
          fileNameOld: fileNameNew,
          fileNameNew: fileNameOld
        })
        console.log('Rename successful', res)
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.error('Rename failed', res)
      }
    })
  },
  renameSync() {
    const { fileNameOld, fileNameNew } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.renameSync(
        `${wx.env.USER_DATA_PATH}/${fileNameOld}`,
        `${wx.env.USER_DATA_PATH}/${fileNameNew}`,
      )
      wx.showToast({
        title: i18n['file-system16'],
        icon: 'success',
        mask: true
      })
      this.setData({
        fileNameOld: fileNameNew,
        fileNameNew: fileNameOld
      })
      console.log('Rename successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system17'],
        icon: 'none',
        mask: true
      })
      console.log('Rename failed', e)
    }
  },
  copyFile() {
    let { fileName, fileNameCopy } = this.data
    const fs = wx.getFileSystemManager()
    fs.copyFile({
      srcPath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      destPath: `${wx.env.USER_DATA_PATH}/${fileNameCopy}`,
      success: (res) => {
        wx.showToast({
          title: i18n['file-system18'],
          icon: 'success',
          mask: true
        })
        console.log('Copy successful', res)
      },
      fail: (res) => {
        wx.showToast({
          title: i18n['file-system19'],
          icon: 'none',
          mask: true
        })
        console.error('Copy failed', res)
      }
    })
  },
  copyFileSync() {
    const { fileName, fileNameCopy } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.copyFileSync(
        `${wx.env.USER_DATA_PATH}/${fileName}`,
        `${wx.env.USER_DATA_PATH}/${fileNameCopy}`,
      )
      wx.showToast({
        title: i18n['file-system18'],
        icon: 'success',
        mask: true
      })
      console.log('Copy successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system19'],
        icon: 'none',
        mask: true
      })
      console.log('Copy failed', e)
    }
  },
  checkExistCopyFile() {
    const { fileNameCopy } = this.data
    this.accessFn(fileNameCopy)
  },
  getFileInfo() {
    let { fileName } = this.data
    const fs = wx.getFileSystemManager()
    fs.getFileInfo({
      filePath: `${wx.env.USER_DATA_PATH}/${fileName}`,
      success: (res) => {
        this.setData({
          fileSize: res.size + i18n['file-system20']
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  getSavedFileList() {
    const fs = wx.getFileSystemManager()
    fs.getSavedFileList({
      success: (res) => {
        const { fileList } = res
        this.setData({
          fileList
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  removeSavedFile() {
    const fs = wx.getFileSystemManager()
    const { fileList } = this.data
    if (fileList.length > 0) {
      fs.removeSavedFile({
        filePath: fileList[0].filePath,
        complete: (res) => {
          this.getSavedFileList()
          console.log('Deletion successful', res)
        },
        success: (res) => {
          wx.showToast({
            title: i18n['file-system21'],
            icon: 'success',
            mask: true
          })
        },
        fail: (res) => {
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            mask: true
          })
        }
      })
    }
  },
  mkdir() {
    const { dir } = this.data
    const fs = wx.getFileSystemManager()
    fs.mkdir({
      dirPath: `${wx.env.USER_DATA_PATH}/${dir}`,
      recursive: false,
      success: (res) => {
        wx.showToast({
          title: i18n['file-system22'],
          icon: 'success',
          mask: true
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  mkdirSync() {
    const { dir } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.mkdirSync(
        `${wx.env.USER_DATA_PATH}/${dir}`,
        false
      )
      wx.showToast({
        title: i18n['file-system22'],
        icon: 'success',
        mask: true
      })
      console.log('Directory creation successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system23'],
        icon: 'none',
        mask: true
      })
      console.log('Directory creation failed', e)
    }
  },
  readdir() {
    const { dir } = this.data
    const fs = wx.getFileSystemManager()
    fs.readdir({
      dirPath: `${wx.env.USER_DATA_PATH}/${dir}`,
      success(res) {
        wx.showToast({
          title: i18n['file-system25'],
          icon: 'success',
          mask: true
        })
      },
      fail(res) {
        wx.showToast({
          title: i18n['file-system25'],
          icon: 'none',
          mask: true
        })
        console.error('File read failed', res)
      }
    })
  },
  readdirSync() {
    const fs = wx.getFileSystemManager()
    const { dir } = this.data
    try {
      const res = fs.readdirSync(`${wx.env.USER_DATA_PATH}/${dir}`)
      console.log('File read successful', res)
      wx.showToast({
        title: i18n['file-system25'],
        icon: 'success',
        mask: true
      })
    } catch (e) {
      wx.showToast({
        title: i18n['file-system25'],
        icon: 'none',
        mask: true
      })
      console.log('File read failed', e)
    }
  },
  rmdir() {
    const { dir } = this.data
    const fs = wx.getFileSystemManager()
    fs.rmdir({
      dirPath: `${wx.env.USER_DATA_PATH}/${dir}`,
      recursive: true,
      success: res => {
        wx.showToast({
          title: i18n['file-system26'],
          icon: 'success',
          mask: true
        })
        console.log('Deletion successful', res)
      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.log('Deletion failed', res)
      }
    });
  },
  rmdirSync() {
    const { dir } = this.data
    const fs = wx.getFileSystemManager()
    try {
      const res = fs.rmdirSync(
        `${wx.env.USER_DATA_PATH}/${dir}`,
        true
      )
      wx.showToast({
        title: i18n['file-system26'],
        icon: 'success',
        mask: true
      })
      console.log('Directory deletion successful', res)
    } catch (e) {
      wx.showToast({
        title: i18n['file-system27'],
        icon: 'none',
        mask: true
      })
      console.log('Directory deletion failed', e)
    }
  },
  checkDirExist() {
    const { dir } = this.data
    this.accessFn(dir)
  },
  isFileOrDir() {
    const { dir } = this.data
    let fs = wx.getFileSystemManager()
    fs.stat({
      path: `${wx.env.USER_DATA_PATH}/${dir}`,
      success: res => {
        this.setData({
          isDir: res.stats.isDirectory(),
          isFile: res.stats.isFile()
        })
      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  isFileOrDirSync() {
    this.setData({
      isDir: '--',
      isFile: '--'
    })
    const { dir } = this.data
    let fs = wx.getFileSystemManager()
    try {
      let stats = fs.statSync(`${wx.env.USER_DATA_PATH}/${dir}`)
      this.setData({
        isDir: stats.isDirectory(),
        isFile: stats.isFile()
      })
    } catch (e) {
      wx.showToast({
        title: i18n['file-system28'],
        icon: 'none',
        mask: true
      })
    }
  },
  saveZipFile() {
    const fs = wx.getFileSystemManager()
    wx.downloadFile({
      url: 'https://codeload.github.com/wuguofang/doc/zip/refs/heads/master',
      // url: 'https://github.com/wuguofang/doc/raw/master/%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC.pdf',
      success: (res) => {
        console.log('Download successful', res)
        const tempFilePath = res.tempFilePath;
        fs.saveFile({
          tempFilePath: tempFilePath,
          success: (res) => {
            const savedFilePath = res.savedFilePath
            this.setData({
              zipPath: savedFilePath
            })
            wx.showToast({
              title: i18n['file-system29'],
              icon: 'success',
              mask: true
            })
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.error(res)
      }
    })
  },
  saveZipFileSync() {
    const fs = wx.getFileSystemManager()
    wx.downloadFile({
      url: 'https://codeload.github.com/wuguofang/doc/zip/refs/heads/master',
      // url: 'https://github.com/wuguofang/doc/raw/master/%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC.pdf',
      success: (res) => {
        console.log('Download successful', res)
        const tempFilePath = res.tempFilePath;
        try {
          const saveres = fs.saveFileSync(tempFilePath)
          const savedFilePath = saveres.savedFilePath
          this.setData({
            zipPath: savedFilePath
          })
          wx.showToast({
            title: i18n['file-system29'],
            icon: 'success',
            mask: true
          })
        } catch (e) {
          wx.showToast({
            title: i18n['file-system30'],
            icon: 'none',
            mask: true
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.error(res)
      }
    })
  },
  unzip() {
    const { zipPath, zipDir } = this.data
    const fs = wx.getFileSystemManager()
    fs.unzip({
      zipFilePath: zipPath,
      targetPath: `${wx.env.USER_DATA_PATH}/${zipDir}`,
      success: res => {
        wx.showToast({
          title: i18n['file-system31'],
          icon: 'success',
          mask: true
        })
      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
      }
    })
  }
})
