import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaCamera } from 'react-icons/fa';

export const UserPicItem = () => {
  const user = useSelector((state: RootState) => state.user.value);

  const userPicture =
    user?.profilePicture || `url('src/assets/defaultAvatar.png')`;

  // const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const overlayStyle = {
    backgroundImage: userPicture,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  // const handleProfilePictureChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     uploadNewProfilePicture(file);
  //   }
  // };

  // const uploadNewProfilePicture = (file: File) => {
  //   if (userFromDB) {
  //     const storageRef = ref(
  //       storage,
  //       `profile_pictures/${currentUser?.uid}/${file.name}`
  //     );
  //     uploadBytes(storageRef, file).then((snapshot) => {
  //       getDownloadURL(snapshot.ref)
  //         .then((url) => {
  //           const updatedUser = { ...userFromDB, picture: url };
  //           updateUser(userFromDB.userId, updatedUser);
  //           setImageUrl(url);
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "Erreur lors de la récupération de l'URL de la nouvelle image de profil:",
  //             error
  //           );
  //         });
  //     });
  //   } else {
  //     console.error('Erreur: userFromDB est indéfini');
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div
        style={overlayStyle}
        className="w-52 h-52 rounded-full bg-gray-300 flex justify-center items-center"
      >
        <input
          type="file"
          accept="image/*"
          // onChange={handleProfilePictureChange}
          className="opacity-0 cursor-pointer z-10 inset-0 w-52 h-52 rounded-full"
        />
        <div className="flex flex-col items-center absolute gap-4 pt-8">
          <FaCamera className="camera-icon text-mainWhite w-6 h-6" />
          <span className="text-mainWhite text-center max-w-44">
            AJOUTER UNE PHOTO DE PROFIL
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPicItem;
