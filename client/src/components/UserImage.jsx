
const UserImage = ({ image, size = "60px" }) => {
  const width = 'w-[' + size + ']'
  const height = 'h-[' + size + ']'
  return (
    <div className={`w-[${size}] h-[${size}]`}>
      <img
        className={`object-cover rounded-[50%] ${width} ${height}`}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
