import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../styles/groups.css";

const UserPicture = styled.img`
  width: 30px;
  height: 30px;
`;

const PeopleMedal = styled.img`
  width: 15px;
  height: auto;
`;

const ico = (exp) => {
  let src, alt;

  if (exp >= 10) {
    src = "/static/images/partner.png";
    alt = "파트너 직원";
  } else if (exp >= 5) {
    src = "/static/images/best.png";
    alt = "베스트 직원";
  } else {
    return null;
  }

  return (
    <span>
      <PeopleMedal src={src} alt={alt} />
    </span>
  );
};

const Group = () => {
  const [Groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { groupId } = useParams();

  useEffect(() => {
    fetchData(groupId);
  }, [groupId]);

  const fetchData = async (groupId) => {
    setLoading(true); // 데이터 요청 전 로딩 상태를 true로 설정
    setError(null); // 데이터 요청 전 에러 상태 null로 설정
    fetch("https://api.soonigroup.com/v1/sooni/groups/" + groupId)
      .then((response) => {
        if (!response.ok) {
          throw Error("Not Found");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          setGroups(data.data);
        } else {
          setError("Error fetching data");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center my-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <>
      <div className="alert alert-info alert-dismissible fade show">
        <strong>※</strong> <a href="https://bj.afreecatv.com/wnnw/post/118223643">2024. 03. 08 수니그룹 조직도 (12AM)</a> 기준
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert"></button> */}
      </div>
      <div className="row g-3" id="list">
        {Groups && Groups.length > 0 ? (
          <>
            {Groups.map((item) => (
              <div key={item.user_id} className={`col-12 col-sm-12 col-md-6 col-lg-4 grade-${item.grade_id}`}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    {item.is_broad === "Y" ? <span className="live">LIVE</span> : null}
                    <span className="side-stick"></span>
                    <div className="card-title mb-1">
                      <span className="me-2">
                        <UserPicture src={item.user_profile} alt={item.broad_title} className="user_pic" />
                      </span>
                      <span className="me-2">{item.user_nick}</span>
                    </div>
                    <p className="text-body-secondary text-muted">
                      <small>
                        {item.group ? item.group : null} {item.grade} | 지분 {item.exp}%
                      </small>
                      {item.grade !== "회장" ? ico(item.exp) : null}
                    </p>
                    <p className="card-text">
                      {item.is_broad === "Y" ? (
                        <>
                          <span className="me-2">
                            <i className="bi bi-broadcast-pin"></i>
                          </span>
                          <a href={`https://play.afreecatv.com/${item.user_id}`} target="_blank" className="broad-link">
                            {item.broad_title}
                          </a>
                        </>
                      ) : null}
                    </p>
                    <div className="d-flex align-items-center">
                      <a href={`https://bj.afreecatv.com/${item.user_id}`} target="_blank" className="sns-link me-2">
                        <i className="bi bi-house-door"></i>
                      </a>
                      {item.link_instagram ? (
                        <a href={item.link_instagram} target="_blank" className="sns-link me-2">
                          <i className="bi bi-instagram"></i>
                        </a>
                      ) : null}
                      {item.link_youtube ? (
                        <a href={item.link_youtube} target="_blank" className="sns-link me-2">
                          <i className="bi bi-youtube"></i>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No groups found</p>
        )}
      </div>
    </>
  );
};

export default Group;
