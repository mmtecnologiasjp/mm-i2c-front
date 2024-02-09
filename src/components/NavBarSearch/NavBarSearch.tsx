import { useDisclose } from '../../hooks/useDisclose';
import { Modal } from '../Modal';
import { SearchModalContent } from '../SearchModalContent';

export function NavBarSearch() {
  const [isOpen, onToggle] = useDisclose();

  return (
    <div className="form-control mx-2">
      <div className="input-group mt-4">
        <input
          onClick={onToggle}
          type="text"
          placeholder="Search…"
          className="w-full input input-bordered h-10"
        />
        <button
          title="search"
          type="button"
          className="bg-gray-800 p-2"
          onClick={onToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <Modal open={isOpen} disableClickOutside={!isOpen} onClose={onToggle}>
        <SearchModalContent onCloseDueNavigation={onToggle} />
      </Modal>
    </div>
  );
}
