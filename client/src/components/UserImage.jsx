
const UserImage = ({ image, size = "60px" }) => {
  const width = 'w-[' + size + ']'
  const height = 'h-[' + size + ']'
  // ${width} ${height}
  return (
    <div className={`w-[${size}] h-[${size}]`}>
      <img
        className={`object-cover rounded-[50%] w-14 h-14`}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
