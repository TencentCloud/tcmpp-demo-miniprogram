Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: 'title'
    },
    inputs: {
      type: Array,
      value: [{ key: '0', name:'parameter1',placeholder:'Please enter the content' }]
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: 'Cancel'
    },
    confirmText: {
      type: String,
      value: 'Sure'
    }
  },

  data: {
    inputValues: {}
  },

  methods: {
    onInput: function (e) {
      const key = e.target.dataset.name;
      const value = e.detail.value;
      const newmap = this.data.inputValues;
      newmap[key] = value;
      console.log(key,value);
      this.setData({
        inputValues: newmap
      });
    },

    onCancel: function () {
      this.triggerEvent('cancel');
    },

    onConfirm: function () {
      this.triggerEvent('confirm', { value: this.data.inputValues });
    }
  }
});