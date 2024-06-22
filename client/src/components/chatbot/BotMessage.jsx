import { useState, useEffect } from "react";

const BotMessage = ({ fetchMessage }) => {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Hàm để xử lý chuỗi Markdown sang plain text
  function markdownToPlainText(markdown) {
    // Xóa các ký tự đánh dấu Markdown
    let plainText = markdown.replace(/^\s*[*-]\s*/gm, ""); // Loại bỏ ký tự '*' hoặc '-' ở đầu dòng
    plainText = plainText.replace(/^\s*[*-]\s*/gm, ""); // Loại bỏ ký tự '*' hoặc '-' ở đầu dòng (lặp lại để xử lý các mục liệt kê)

    // Xóa các dòng trống
    plainText = plainText.replace(/^\s*[\r\n]/gm, "");

    // Trả về kết quả đã xử lý
    return plainText.trim();
  }

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      markdownToPlainText(msg);
      console.log(msg);
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : message}</div>
    </div>
  );
};

export default BotMessage;
