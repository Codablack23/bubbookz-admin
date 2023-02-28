import { Skeleton } from "antd";

export default function LoadingState(){
    return (
      <div className="p-3 bg-white rounded-lg">
          <header className="bub-grid">
            <div className="grid-col-4 grid-col-md-12">
              <Skeleton.Button 
              style={{height:'300px'}}
              block
              active/>
            </div>
            <div className="grid-col-4 grid-col-md-12">
              <Skeleton
              paragraph={{rows:5}}
              active
              />
            </div>
            <div className="grid-col-4 grid-col-md-12">
              <Skeleton.Button block style={{height:'300px'}} active/>
            </div>
          </header>
          <div className="mt-4">
           <Skeleton
              paragraph={{rows:5}}
              active
              />
          </div>
          <div className="mt-4">
           <Skeleton
              paragraph={{rows:5}}
              active
              />
          </div>
      </div>
    )
}