import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

interface GroupPicItemProps {
  placeholder: string;
  picture: string;
  setGroupPicture: (file: File | undefined) => void;
  date: string;
}

export const GroupPicItem: React.FC<GroupPicItemProps> = ({
  placeholder,
  picture,
  setGroupPicture,
  date,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const userDefaultPicture = `url('src/assets/defaultAvatar.png')`;

  const imageStyle = {
    backgroundImage: selectedFile
      ? `url(${URL.createObjectURL(selectedFile)})`
      : picture
      ? `url(${picture})`
      : userDefaultPicture,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setGroupPicture(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div
        style={imageStyle}
        className="w-52 h-52 rounded-full bg-gray-300 flex justify-center items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="opacity-0 cursor-pointer z-10 inset-0 w-52 h-52 rounded-full"
        />

        <div className="flex flex-col items-center absolute gap-4 pt-8">
          <FaCamera className="camera-icon text-mainWhite w-6 h-6" />
          <span className="text-mainWhite text-center max-w-44">
            {placeholder}
          </span>
        </div>
      </div>
      <label className="mt-4 font-medium">Créé le : {date}</label>
    </div>
  );
};

export default GroupPicItem;
