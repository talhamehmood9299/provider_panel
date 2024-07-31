const TableRow = ({ children, additionalClasses = "" }) => {
  return (
    <td
      className={`px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border-r text-sm text-black text-center ${additionalClasses}`}
    >
      {children}
    </td>
  );
};

export default TableRow;
