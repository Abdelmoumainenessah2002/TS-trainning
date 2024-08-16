const pages = [1, 2, 3, 4, 5]
const Pagination = () => {
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
      <div className="mx-2 border border-gray-700 text-gray-700 rounded-md py-1 px-3 text-xl cursor-pointer hover:bg-gray-200 transition">
        Prev
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className="mx-2 border border-gray-700 text-gray-700 rounded-md py-1 px-3 text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          {page}
        </div>
      ))}
      <div className="mx-2 border border-gray-700 text-gray-700 rounded-md py-1 px-3 text-xl cursor-pointer hover:bg-gray-200 transition">
        Next
      </div>
    </div>
  );
}

export default Pagination