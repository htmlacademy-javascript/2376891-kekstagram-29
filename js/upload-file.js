const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileElement = document.querySelector('.img-upload');
const fileChooserElement = uploadFileElement.querySelector('#upload-file');
const previewElement = uploadFileElement.querySelector('.img-upload__preview img');
const effectPreviewElements = uploadFileElement.querySelectorAll('.effects__preview');

const setUploadFile = () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
    effectPreviewElements.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = ` url(${previewElement.src})`;
    });
  }
};

export { setUploadFile };
