import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { useTranslation } from "../TranslationContext";
function DashHome() {
  const { translations } = useTranslation();
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <main className="main-container">
        <div className="main">
          <div className="main-title">
            <h3 className="dashtitle">{translations.dashtitle}</h3>
          </div>

          <div className="main-cards">
            <div className="card">
              <div class="sales">
                <i class="fa-solid fa-chart-pie"></i>
                <div class="middle">
                  <div class="left">
                    <h3 className="totalsales">{translations.totalsales}</h3>
                    <h5 className="price">$25,024</h5>
                  </div>
                  <div class="progress">
                    <svg>
                      <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div class="number">
                      <p>81%</p>
                    </div>
                  </div>
                </div>
                <small class="time">{translations.time}</small>
              </div>
            </div>
            <div className="card">
              <div class="expanses">
                <i class="fa-solid fa-chart-column"></i>
                <div class="middle">
                  <div class="left">
                    <h3 className="totalexpanses">
                      {translations.totalexpanses}
                    </h3>
                    <h5 className="price">$25,024</h5>
                  </div>
                  <div class="progress">
                    <svg>
                      <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div class="number">
                      <p>81%</p>
                    </div>
                  </div>
                </div>
                <small class="time">{translations.time}</small>
              </div>
            </div>
            <div className="card">
              <div class="income">
                <i class="fa-solid fa-chart-line"></i>
                <div class="middle">
                  <div class="left">
                    <h3 className="totalincome">{translations.totalincome}</h3>
                    <h5 className="price">$25,024</h5>
                  </div>
                  <div class="progress">
                    <svg>
                      <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div class="number">
                      <p>81%</p>
                    </div>
                  </div>
                </div>
                <small class="time">{translations.time}</small>
              </div>
            </div>
          </div>
          <div class="recent-orders">
            <h2 className="recentorders">{translations.recentorders}</h2>
            <table>
              <thead>
                <tr>
                  <th className="prodname">{translations.prodname}</th>
                  <th className="prodnum">{translations.prodnum}</th>
                  <th className="pay">{translations.pay}</th>
                  <th className="status">{translations.status}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Beige Coach</td>
                  <td>325235</td>
                  <td>Due</td>
                  <td class="pending warning">{translations.pending}</td>
                  <td class="primary">Details</td>
                </tr>
                <tr>
                  <td>Beige Coach</td>
                  <td>325235</td>
                  <td>Due</td>
                  <td class="pending warning">{translations.pending}</td>
                  <td class="primary">Details</td>
                </tr>
                <tr>
                  <td>Beige Coach</td>
                  <td>325235</td>
                  <td>Due</td>
                  <td class="pending warning">{translations.pending}</td>
                  <td class="primary">Details</td>
                </tr>
                <tr>
                  <td>Beige Coach</td>
                  <td>325235</td>
                  <td>Due</td>
                  <td class="pending warning">{translations.pending}</td>
                  <td class="primary">Details</td>
                </tr>
                <tr>
                  <td>Beige Coach</td>
                  <td>325235</td>
                  <td>Due</td>
                  <td class="pending warning">{translations.pending}</td>
                  <td class="primary">Details</td>
                </tr>
              </tbody>
            </table>
            <a href="#" className="showall">
              Show All
            </a>
          </div>
        </div>
        <div class="right">
          <div class="recent-updates">
            <h2 className="recentupdates">{translations.recentupdates}</h2>
            <div class="updates">
              <div class="update">
                <div class="profile-photo">
                  <img src="/logo.png" alt="" />
                </div>
                <div class="message">
                  <p>
                    <b>customer1 Name</b> recieved his order of coach.
                  </p>
                  <small>2 Minutes Ago</small>
                </div>
              </div>
              <div class="update">
                <div class="profile-photo">
                  <img src="/logo.png" alt="" />
                </div>
                <div class="message">
                  <p>
                    <b>customer2 Name</b> recieved his order of coach.
                  </p>
                  <small>2 Minutes Ago</small>
                </div>
              </div>
              <div class="update">
                <div class="profile-photo">
                  <img src="/logo.png" alt="" />
                </div>
                <div class="message">
                  <p>
                    <b>customer3 Name</b> recieved his order of coach.
                  </p>
                  <small>2 Minutes Ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="sales-analytics">
            <h2 className="salesanalytics">{translations.salesanalytics}</h2>
            <div class="item online">
              <div class="icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div class="right">
                <div class="info">
                  <h3 className="onlineorders">{translations.onlineorders}</h3>
                  <small class="time">{translations.time}</small>
                </div>
                <h5 class="success">+39%</h5>
                <h3>3854</h3>
              </div>
            </div>
            <div class="item offline">
              <div class="icon">
                <i class="fa-solid fa-bag-shopping"></i>
              </div>
              <div class="right">
                <div class="info">
                  <h3 className="offlineorders">
                    {translations.offlineorders}
                  </h3>
                  <small class="time">{translations.time}</small>
                </div>
                <h5 class="danger">-17%</h5>
                <h3>1100</h3>
              </div>
            </div>
            <div class="item customer">
              <div class="icon">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="right">
                <div class="info">
                  <h3 className="newcustomer">{translations.newcustomer}</h3>
                  <small class="time">{translations.time}</small>
                </div>
                <h5 class="success">+25%</h5>
                <h3>849</h3>
              </div>
            </div>
            <div class="item add-product">
              <div>
                <i class="fa-solid fa-plus"></i>
                <h3 className="addprod">{translations.addprod}</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashHome;
