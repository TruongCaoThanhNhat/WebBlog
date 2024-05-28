import React from 'react';
import "./comment.scss";
const Comment = () => {
  return (
    <div className="container bootdey">
      <div className="col-md-12 bootstrap snippets">
        <div className="panel">
          <div className="panel-body">
            <textarea className="form-control" rows="2" placeholder="What are you thinking?"></textarea>
            <div className="mar-top clearfix">
              <button className="btn btn-sm btn-primary pull-right" type="submit">
                <i className="fa fa-pencil fa-fw"></i> Share
              </button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            {/* Newsfeed Content */}
            <div className="media-block">
              <a className="media-left" href="#">
                <img
                  className="img-circle img-sm"
                  alt="Profile"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                />
              </a>
              <div className="media-body">
                <div className="mar-btm">
                  <a href="#" className="btn-link text-semibold media-heading box-inline">
                    Lisa D.
                  </a>
                  <p className="text-muted text-sm">
                    11 min ago
                  </p>
                </div>
                <p className="text"> 
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                  dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                  exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                  consequat.
                </p>
                <div className="pad-ver">
                  <div className="btn-group">
                    <a className="btn btn-sm btn-default btn-hover-success" href="#">
                      <i className="fa fa-thumbs-up"></i>
                    </a>
                    <a className="btn btn-sm btn-default btn-hover-danger" href="#">
                      <i className="fa fa-thumbs-down"></i>
                    </a>
                  </div>
                  <a className="btn btn-sm btn-default btn-hover-primary" href="#">
                    Comment
                  </a>
                </div>
                <hr />
                {/* Comments */}
                <div>
                </div>
              </div>
            </div>
            {/* End Newsfeed Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
