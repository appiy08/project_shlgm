import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const ImageUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file) => {
    setUploading(true);
    // Call API to upload image
    fetch('/api/upload-image', {
      method: 'POST',
      body: file,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploading(false);
        message.success('Image uploaded successfully!');
        // Update fileList state with uploaded image
        setFileList([...fileList, { uid: data.imageId, name: data.imageName, status: 'done' }]);
      })
      .catch((error) => {
        setUploading(false);
        message.error('Error uploading image!');
        console.log('error :>',error);
      });
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  return (
    <div>
      <Upload
        id="image-upload-form"
        name="image"
        fileList={fileList}
        onRemove={handleRemove}
        beforeUpload={() => false}
      >
        <Button>
          <InboxOutlined /> Select Image
        </Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  );
};

export default ImageUpload;