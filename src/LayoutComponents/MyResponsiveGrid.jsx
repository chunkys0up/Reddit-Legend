import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import HeaderWithPopup from "./Header";
import DisplaySubreddit from "./Reddit";

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyResponsiveGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 4,
      items: [
        {
          i: "1",
          subreddit: "r/towerofgod",
          layout: { x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        },
        {
          i: "2",
          subreddit: "r/bleach",
          layout: { x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        },
        {
          i: "3",
          subreddit: "r/wallstreetbets",
          layout: { x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        },
      ],
    };
  }

  createGrid = (subreddit) => {
    const { counter, items } = this.state;

    const newItem = {
      i: `${counter}`,
      subreddit: `r/${subreddit}`,
      layout: {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
        minW: 3,
        minH: 2,
      },
    };

    this.setState({
      items: [...items, newItem],
      counter: counter + 1,
    });
  };

  render() {
    const { items } = this.state;
    const { token } = this.props;
    //console.log(`token: ${token}`);

    return (
      <div className="bg-zinc-900 h-screen w-screen grid grid-rows-[70px_1fr]">
        {/* Pass createGrid with subreddit and closePopup */}
        <HeaderWithPopup
          createGrid={(subreddit) => this.createGrid(subreddit)}
          accessToken={token}
        />

        <div className="h-full w-full overflow-auto">
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            isDraggable={true}
            isResizable={true}
            rowHeight={80}
            compactType={null}
            preventCollision={true}
            layouts={{
              lg: items.map((item) => ({ i: item.i, ...item.layout })),
            }}
            onLayoutChange={this.handleLayoutChange}
          >
            {items.map((item) => (
              <div
                key={item.i}
                className="bg-white flex justify-center items-center"
              >
                {/*{item.subreddit} */}
                <DisplaySubreddit subreddit={item.subreddit} token={token} />
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    );
  }
}

export default MyResponsiveGrid;
