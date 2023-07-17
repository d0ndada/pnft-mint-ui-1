"use client"
export const MovingItems = () => {
  return (
    
          <div className="cloud-content">
            {[...Array(7)].map((cloud, index) => (
              <div key={index} className={`cloud-${index + 1} cloud-block`}>
                <div className="cloud"></div>
              </div>
            ))}
            {/* <svg
              className="sun"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 200 200"
            >
              <defs>
                <radialGradient
                  id="grad1"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(255,255,0)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(255,165,0)"
                    stopOpacity="1"
                  />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#grad1)" />
            </svg> */}
          </div>
  )
}
