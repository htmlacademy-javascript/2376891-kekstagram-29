const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileElement = document.querySelector('.img-upload');
const fileChooser = uploadFileElement.querySelector('#upload-file');
const preview = uploadFileElement.querySelector('.img-upload__preview img');
const effectPreviews = uploadFileElement.querySelectorAll('.effects__preview');

const setUploadFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = ` url(${URL.createObjectURL(file)})`;
    });
  }
};

export { setUploadFile };
