'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var estateChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');


  var inputAvatarChangeHandler = function () {
    var image = fileChooser.files[0];
    var imageName = image.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return imageName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(image);
    }
  };

  var inputPhotosChangeHandler = function () {
    var files = estateChooser.files;

    for (var i = 0; i < files.length; i++) {
      var photoName = files[0].name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return photoName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var blockPhoto = document.createElement('div');
          blockPhoto.classList.add('ad-form__photo');

          var image = document.createElement('img');
          image.height = 70;
          image.width = 70;
          image.src = reader.result;

          blockPhoto.appendChild(image);
          photoContainer.appendChild(blockPhoto);
        });
      }
      reader.readAsDataURL(files[i]);
    }
  };

  var clearInputImages = function () {
    preview.src = DEFAULT_AVATAR_SRC;

    var photoList = photoContainer.querySelectorAll('.ad-form__photo');

    photoList.forEach(function (item) {
      photoContainer.removeChild(item);
    });

    var firstBlock = document.createElement('div');
    firstBlock.classList.add('ad-form__photo');
    photoContainer.appendChild(firstBlock);
  };

  fileChooser.addEventListener('change', inputAvatarChangeHandler);
  estateChooser.addEventListener('change', inputPhotosChangeHandler);

  window.image = {
    clearInputImages: clearInputImages
  };
})();
