import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MdOutlineQueryStats, MdOutlineReport } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Report } from '../../components/admin/Report';
import { Moderation } from '../../components/admin/Moderation';
import { Stats } from '../../components/admin/Stats';

const AdminPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [currentPage, setCurrentPage] = useState('Report');

  const pages: Record<string, React.ReactNode> = {
    Report: <Report />,
    Modération: <Moderation />,
    Statistiques: <Stats />,
  };

  const navigation = [
    {
      name: 'Report',
      icon: <FaUserShield className="w-6 h-6" />,
    },
    {
      name: 'Modération',
      icon: <MdOutlineReport className="w-6 h-6" />,
    },
    {
      name: 'Statistiques',
      icon: <MdOutlineQueryStats className="w-6 h-6" />,
    },
  ];

  const handlePageChange = (name: string) => {
    setCurrentPage(name);
  };

  return (
    <div className="flex h-full w-full">
      <nav className="w-full h-full border-r bg-white space-y-8 sm:w-80">
        <div className="flex flex-col h-full">
          <div className="h-20 flex flex-row items-center gap-4 px-4 mb-6">
            <Link to="/" className="flex-none">
              <img alt="logo" src="src/assets/logo_outline.png" width={60} />
            </Link>
            <div className="text-2xl">Whats'Up</div>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handlePageChange(item.name)}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <div className="py-4 px-4 border-t">
                <div className="flex items-center gap-x-4">
                  <img
                    alt="profilePicture"
                    src={user?.picture}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-semibold">
                      {user?.pseudo}
                    </span>
                    <Link
                      to="../profile"
                      className="block mt-px text-gray-600 hover:text-indigo-600 text-xs">
                      Voir mon profil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{pages[currentPage]}</main>
    </div>
  );
};

export default AdminPage;
