import Link from 'next/link';
import { FaHome, FaUser, FaUsers, FaCalendarAlt } from 'react-icons/fa'; // İkonları içe aktar


const Navigation = () => {
  return (
    <nav className="relative bg-gray-300 p-4 text-white">
      {/* Home için sabit resim */}
      <Link href="/" className="absolute top-4 left-4">
        <img
          src="/home.png"
          alt="Home Icon"
          className="w-12 h-12"
        />
      </Link>

      <ul className="flex space-x-4 justify-center">
        <li>
          <Link
            href="/players"
            className="flex items-center px-4 py-2 bg-blue-700 rounded hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
          >
            <FaUser className="mr-2" /> Players
          </Link>
        </li>
        <li>
          <Link
            href="/teams"
            className="flex items-center px-4 py-2 bg-blue-700 rounded hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
          >
            <FaUsers className="mr-2" /> Teams
          </Link>
        </li>
        <li>
          <Link
            href="/fixtures"
            className="flex items-center px-4 py-2 bg-blue-700 rounded hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
          >
            <FaCalendarAlt className="mr-2" /> Fixtures
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
