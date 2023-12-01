import './Content.css';

export function Content() {

  return (
    <div className="content-page">
      <div className="content">
        <div className="title">
          <h1>NATIONAL PARKS</h1>
          <div className="row">
            <h1 className='col'>CAMP REVIEWS</h1>
            <div className="col-2">
              <img src="https://icon-library.com/images/camping-icon-png/camping-icon-png-15.jpg" width="350" height="300" />
            </div>  
          </div>  
        </div>  
        <div className ='yosemite'>
          <div className="row">
            <div className="col">
              <div className='yose-description'>
                <h6 className='description'>Yosemite is noted for its outstanding scenery—including peaks, canyons, cliffs, domes, rivers, lakes, immense waterfalls, lush green meadows, wildlife, and forests. Yosemite National Park contains a unique assemblage of massive granite domes and glacial features, which resulted from a rich geologic history.</h6>
              </div>
            </div>
            <div className="col">
              <div className="yose-image">
                <img src="https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1914.1100.jpg" width="350" height="200" alt="Yosemite" />
              </div>
            </div>
            <div className="col">
              <div className="yose">YOSEMITE</div>
            </div>
          </div>
        </div>
        <div className ='yellowstone'>
          <div className="row">
            <div className="col">
              <div className="yellow">YELLOWSTONE</div>
            </div>
            <div className="col">
              <div className="yellow-image">
                <img src="https://national-park.com/wp-content/uploads/2016/04/Welcome-to-Yellowstone-National-Park.jpg" width="350" height="200" alt="Yellowstone" />
              </div>
            </div>
            <div className="col">
              <div className="yellow-description">
                <h6 className="description-2">Yellowstone sits on top of a dormant volcano and is home to more geysers and hot springs than any other place on earth. Wonders abound at this truly unique national park, from sites like the Yellowstone Grand Canyon to wildlife like Americas largest buffalo herd, grizzly bears, and wolves.</h6>
              </div>
            </div>
          </div>
        </div>
        <div className ='olympic'>
          <div className="row">
            <div className="col">
              <div className="yose-description">
                <h6 className="description">Encompassing nearly a million acres, the park protects a vast wilderness, thousands of years of human history, and several distinctly different ecosystems, including glacier-capped mountains, old-growth temperate rain forests, and over 70 miles of wild coastline.</h6>
              </div>  
            </div>
            <div className="col">
              <div className="olympic-image">
                <img src="https://s27363.pcdn.co/wp-content/uploads/2021/02/Hurricane-Ridge-Olympic-NP.jpg.optimal.jpg" width="350" height="200" alt="Olympic" />
              </div>
            </div>
            <div className="col">
              <div className="yellow">OLYMPIC</div>
            </div>
          </div>
        </div>  
      </div>
    </div> 
  )
}




