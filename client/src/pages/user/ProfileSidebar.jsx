import { apiGetAuthor, } from "@/api/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProfileSidebar = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
   
    useEffect(() => {
      const fetchUser = async () => {
        const res = await apiGetAuthor(username);
        setUser(res.data.user);
        // console.log(res.data.user);
      };

      fetchUser();
    }, [username]);
    
    return (
      <>
        <div className="user__profile-sidebar row">
          <div className="user__profile-dynamic row row-md">
            <div className="user__profile-widget">
              <div className="user__profile-widget-body">
                <div className="user__profile-widget-content">
                  <div className="user__profile-widget-avt">
                    <Link to="/" className="user__profile-widget-avt-link">
                      <img
                        src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-avatar/888b36f07f5711ec834d91a0b30645b4.png"
                        alt=""
                      />
                    </Link>
                  </div>
                  <h1 className="user__profile-widget-disname">
                    <Link to="/">{user && user.userName}</Link>
                  </h1>
                  <p className="user__profile-widget-username">
                    <Link to="/">@{user && user.userName}</Link>
                  </p>
                  <div className="user__profile-widget-bio">
                    ♩ ♪ ♫ ♬ ♭ ♪ ♩ ♪♫
                  </div>
                  <div className="user__profile-widget-button">
                    <button className="user__profile-widget-button-item">
                      <span>Theo dõi</span>
                    </button>
                    <button className="user__profile-widget-button-item">
                      <span>Nhắn tin</span>
                    </button>
                  </div>
                  <div className="user__profile-widget-stats">
                    <div>
                      <p className="label">Followers</p>
                      <p className="value">{user?.followers?.length ?? 0}</p>
                    </div>
                    <div>
                      <p className="label">Following</p>
                      <p className="value">
                        {user?.following?.length ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="label">Spider</p>
                      <p className="value">5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default ProfileSidebar;