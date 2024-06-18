export const handleDate = (date) => {
  // Chuyển chuỗi ngày tháng thành đối tượng Date
  const postDateTime = new Date(date);

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Tính khoảng cách thời gian giữa ngày hiện tại và ngày tạo bài (tính bằng mili giây)
  const timeDifference = currentDate.getTime() - postDateTime.getTime();

  // Chuyển đổi khoảng cách thời gian từ mili giây thành ngày
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};
