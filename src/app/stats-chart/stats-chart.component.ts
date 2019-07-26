import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { BaseChartDirective, Color, Label } from "ng2-charts";
import { ChartDataSets, ChartOptions } from "chart.js";
import * as moment from "moment";
import { ExpanseClientService } from "../expanse-client.service";
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: "app-stats-chart",
  templateUrl: "./stats-chart.component.html",
  styleUrls: ["./stats-chart.component.css"]
})
export class StatsChartComponent implements OnInit, AfterViewInit {
  public lineChartData: ChartDataSets[] = [
    {
      data: [
        {
          x: new Date().getTime(),
          y: 0
        }
      ]
    }
    //     {
    //       x: new Date().getTime() + 3600 * 56 * 1000,
    //       y: 59
    //     },
    //     {
    //       x: new Date().getTime() + 3600 * 101 * 1000,
    //       y: 80
    //     }
    //    ], label: 'Views' },
    //   { data: [
    //       {
    //         x: new Date().getTime() + 3600 * 21 * 1000,
    //         y: 40
    //       },
    //       {
    //         x: new Date().getTime() + 3600 * 45 * 1000,
    //         y: 22
    //       },
    //       {
    //         x: new Date().getTime() + 3600 * 86 * 1000,
    //         y: 19
    //       }], label: 'Downloads' },
    //   { data: [
    //       {
    //         x: new Date().getTime() + 3600 * 3 * 1000,
    //         y: 95
    //       },
    //       {
    //         x: new Date().getTime() + 3600 * 15 * 1000,
    //         y: 23
    //       },
    //       {
    //         x: new Date().getTime() + 3600 * 96 * 1000,
    //         y: 120
    //       }
    //       ], label: 'Likes'} // yAxisID: 'y-axis-1'
  ];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    // (ChartOptions & { annotation: any })
    responsive: true,
    legend: {
      labels: { fontColor: "white" }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          type: "time",
          time: {
            minUnit: "hour",
            displayFormats: {
              hour: "hA Do"
            }
          },
          ticks: {
            fontColor: "white",
            padding: 20
          }
        }
      ],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
          ticks: {
            fontColor: "white",
            padding: 20,
            min: 0
          }
        }
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   mirror: true,
        //   ticks: {
        //     fontColor: 'white',
        //   }
        // }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // red
      backgroundColor: "rgba(0,188,212,0.3)",
      borderColor: "#00bcd4",
      pointBackgroundColor: "#ed4e7a",
      pointBorderColor: "#ed4e7a",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#ed4e7a"
    },
    {
      // grey
      backgroundColor: "rgba(156,39,176,0.3)",
      borderColor: "#9c27b0",
      pointBackgroundColor: "#ed4e7a",
      pointBorderColor: "#ed4e7a",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#ed4e7a"
    },
    {
      // dark grey
      backgroundColor: "rgba(205,220,57,0.3)",
      borderColor: "#cddc39",
      pointBackgroundColor: "#ed4e7a",
      pointBorderColor: "#ed4e7a",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#ed4e7a"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
  @Input() apps_id;
  notEnough: boolean;
  selectedFilter = "All";
  versionFilter: string[];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  private var;
  selectedDate = {
    start: moment().subtract(6, "days"), // new Date(new Date().getTime() - (1000 * 3600 * 24 * 7)),
    end: moment()
  };
  constructor(private expanseService: ExpanseClientService) {
    // this.getData();
  }

  customCss() {
    return "black-text";
  }

  getData() {
    this.expanseService
      .start()
      .then(() =>
        this.expanseService.getAppCounters(
          this.apps_id,
          Math.floor(this.selectedDate.start.toDate().getTime() / 1000 / 3600),
          Math.floor(this.selectedDate.end.toDate().getTime() / 1000 / 3600),
          this.selectedFilter
        )
      )
      .then((res: any) => {
        res = this.groupRes(res);
        const views = (res || []).filter(count => count.type === "view");
        const viewsObject = {
          label: "Views",
          data: views.map(count => ({
            x: (count.hour_time || count.day_time) * 3600 * 1000,
            y: count.counter
          })),
          pointRadius: []
        };
        const downloads = (res || []).filter(
          count => count.type === "download"
        );
        const downloadsObject = {
          label: "Downloads",
          data: downloads.map(count => ({
            x: (count.hour_time || count.day_time) * 3600 * 1000,
            y: count.counter
          })),
          pointRadius: []
        };
        const likes = (res || []).filter(count => count.type === "like");
        const likesObject = {
          label: "Likes",
          data: likes.map(count => ({
            x: (count.hour_time || count.day_time) * 3600 * 1000,
            y: count.counter
          })),
          pointRadius: []
        };
        const lineChartData = [];
        if (views.length > 0) {
          viewsObject.data.unshift({
            y: viewsObject.data[0].y,
            x: this.selectedDate.start.toDate()
          });
          viewsObject.data.push({
            y: viewsObject.data[viewsObject.data.length - 1].y,
            x: this.selectedDate.end.toDate()
          });
          viewsObject.pointRadius = viewsObject.data.map((d, i) =>
            i === 0 ? 0 : i === viewsObject.data.length - 1 ? 0 : 5
          ) as any;
          lineChartData.push(viewsObject);
        }
        if (downloads.length > 0) {
          downloadsObject.data.unshift({
            y: downloadsObject.data[0].y,
            x: this.selectedDate.start.toDate()
          });
          downloadsObject.data.push({
            y: downloadsObject.data[downloadsObject.data.length - 1].y,
            x: this.selectedDate.end.toDate()
          });
          downloadsObject.pointRadius = downloadsObject.data.map((d, i) =>
            i === 0 ? 0 : i === downloadsObject.data.length - 1 ? 0 : 5
          ) as any;
          lineChartData.push(downloadsObject);
        }
        if (likes.length > 0) {
          likesObject.data.unshift({
            y: likesObject.data[0].y,
            x: this.selectedDate.start.toDate()
          });
          likesObject.data.push({
            y: likesObject.data[likesObject.data.length - 1].y,
            x: this.selectedDate.end.toDate()
          });
          likesObject.pointRadius = likesObject.data.map((d, i) =>
            i === 0 ? 0 : i === likesObject.data.length - 1 ? 0 : 5
          ) as any;
          lineChartData.push(likesObject);
        }
        this.lineChartData = lineChartData;
        this.notEnough = !lineChartData.length;
        this.chart.chart.config.options.scales.xAxes[0].time.min = this.selectedDate.start.toDate() as any;
        this.chart.chart.config.options.scales.xAxes[0].time.max = this.selectedDate.end.toDate() as any;
      });
  }

  groupRes(res) {
    if (this.selectedFilter === "All") {
      this.versionFilter = ["All"].concat(
        (res || [])
          .map(count => count.versionname)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      );
      let array = res || [];
      console.log(res);
      let flags = {},
        output = [],
        l = array.length,
        i;
      for (i = 0; i < l; i++) {
        array[i].counter = +array[i].counter;
        let key = (array[i].hour_time || array[i].day_time) + array[i].type;
        if (flags[key]) {
          output[flags[key]].counter += +array[i].counter;
          continue;
        }
        flags[key] = i;
        output.push(array[i]);
      }
      return output;
    }
    return res;
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }
  getTopDate(isMax) {
    return (this.chart.chart as any).scales["x-axis-0"][isMax ? "max" : "min"];
  }
}
