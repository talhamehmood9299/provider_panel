const TableRow = ({ children, additionalClasses = "" }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap border-r text-sm text-black text-center ${additionalClasses}`}
    >
      {children}
    </td>
  );
};

export default TableRow;
