const props = {
    alt: {
        type: String,
        value: '',
    },
    badgeProps: {
        type: Object,
    },
    bordered: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    hideOnLoadFailed: {
        type: Boolean,
        value: false,
    },
    icon: {
        type: null,
    },
    image: {
        type: String,
        value: '',
    },
    imageProps: {
        type: Object,
        value: {
            style: "width:100%;height:100%"
        }
    },
    shape: {
        type: String,
        value: 'circle',
    },
    size: {
        type: String,
        value: 'medium',
    },
};
export default props;
