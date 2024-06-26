import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { handleDate } from "@/utils/handleUtils";

const Comment = ({ comment, reply }) => {
  const [replyComment, setReplyComment] = useState(reply);
  const { _id, author, content, voteCount, createdAt } = comment;

  // const [isReply, setIsReply] = useState(false);
  return (
    <div className="comment__item">
      <div className="comment__item-avatar">
        <Link>
          <Avatar />
        </Link>
        <div className="creater-info">
          <Link>
            <p className="creater-name">{author?.userName}</p>
          </Link>
          <span className="time-date">
            {createdAt && handleDate(createdAt)} ngày trước
          </span>
        </div>
        <div className="creater-report">
          <button>Báo cáo</button>
        </div>
      </div>
      <div className="comment__item-body">
        <div className="comment-content">
          {content && content ? <p>{content}</p> : <p></p>}
        </div>
      </div>
      <div className="comment__item-actions">
        <div className="user-actions">
          <div className="d-flex align-items-center">
            <div className="upvote">
              <i>
                <svg
                  _ngcontent-serverApp-c37=""
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    _ngcontent-serverApp-c37=""
                    d="M8.32031 3.98438L3.00781 12.5H13.6719L8.32031 3.98438ZM8.32031 0.820312L16.6797 14.1797H0L8.32031 0.820312Z"
                    class="cls-1"
                  ></path>
                </svg>
              </i>
            </div>
            <div className="value">
              {/* <span>80</span> */}
            </div>
            <div className="downvote">
              <i>
                <svg
                  _ngcontent-serverApp-c37=""
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    _ngcontent-serverApp-c37=""
                    d="M8.67969 11.0156L13.9922 2.5L3.32812 2.5L8.67969 11.0156ZM8.67969 14.1797L0.320311 0.820314L17 0.820312L8.67969 14.1797Z"
                    class="cls-1"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
          <div className="action-reply">
            <span>Trả lời</span>
          </div>
        </div>
      </div>
      {replyComment && replyComment ? (
        <div className="comment__item-replys">
          {replyComment &&
            replyComment.map((item) => (
              <Comment key={item._id} comment={item} reply={reply} />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
