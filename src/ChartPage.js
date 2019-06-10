import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Chart from "chart.js";
import "./App.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { isUndefined } from "util";
import "bootstrap/dist/css/bootstrap.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import BootstrapTable from "react-bootstrap-table-next";

export default class ChartPage extends Component {
  state = {
    x: 0.84,
    y: 0.88,
    maksimum: 2.35,
    ortalama: 1.85,
    minimum: 1.3,
    ndegeri: 0.031,
    jdegeri: 11 * 0.0001,
    grafiginenalti: -0.352,
    adegeri: 0.3,
    mdegeri: 1.6,
    hdegeri: 1.6,
    ndegeriisale: 0.02,
    eselsifirkotu: 953,
    kanalinsonundakisuyuzukotu: 950, //esel sıfır kotundan 3 cıkar
    isalekanaliuzunlugu: 8500,
    kaplamalindegeri: 0.016,
    kaplamalimdegeri: 1.5,
    gamasu: 9810,
    kanald:0.001,
    kaplamalito: 0
  };
  kamplamasizto = 0;
  tkr = 0.06 * (26487 - 9810) * 0.001;
  colums = [
    {
      dataField: "h",
      text: "Derinlik h (m)",
      sort: true
    },
    {
      dataField: "b",
      text: "Taban Genişliği b (m)"
    },
    {
      dataField: "alan",
      text: "Alan  A(m²)"
    },
    {
      dataField: "cevre",
      text: "Çevre Ç (m)",
      sort: true
    },
    {
      dataField: "R",
      text: "Hidrolik Yarıçap R (m)"
    },
    {
      dataField: "j",
      text: "Taban Eğimi J (-)",
      sort: true
    },
    {
      dataField: "hiz",
      text: "Akım Hızı V (m/s)",
      sort: true
    },
    {
      dataField: "kabartmakotu",
      text: "Kabartma Kotu (m)"
    },
    {
      dataField: "kk_esk",
      text: "K.K-E.S.K (m)",
      formatter: this.priceFormatter
    }
  ];
  minimumislakcevre = 81.27;
  ortalamaislakcevre = 83.11;
  maksimumislakcevre = 84.39;

  minimumalan = 103.89;
  ortalamaalan = 148.3;
  maksimumalan = 189.15;

  minimumyaricap = parseFloat(this.minimumalan / this.minimumislakcevre);
  ortalamayaricap = parseFloat(this.ortalamaalan / this.ortalamaislakcevre);
  maksimumyaricap = parseFloat(this.maksimumalan / this.maksimumislakcevre);

  datas;
  ctx;
  ctx2;
  ctx3;
  ctx4;
  ctx5;
  minimumdebi =
    (1 / this.state.ndegeri) *
    Math.pow(this.minimumyaricap, 2 / 3) *
    Math.pow(this.state.jdegeri, 1 / 2) *
    this.minimumalan;
  maksimumdebi =
    (1 / this.state.ndegeri) *
    Math.pow(this.maksimumyaricap, 2 / 3) *
    Math.pow(this.state.jdegeri, 1 / 2) *
    this.maksimumalan;
  ortalamadebi =
    (1 / this.state.ndegeri) *
    Math.pow(this.ortalamayaricap, 2 / 3) *
    Math.pow(this.state.jdegeri, 1 / 2) *
    this.ortalamaalan;
  myMap = new Map();
  mdegerli = new Map();
  isalekanalikaplamasiz = [
    {
      h: 1,
      b: 5
    },
    {
      h: 1.2,
      b: 6
    },
    {
      h: 1.4,
      b: 7
    },
    {
      h: 1.6,
      b: 8
    },
    {
      h: 1.8,
      b: 9
    },
    {
      h: 2.0,
      b: 10
    },
    {
      h: 2.2,
      b: 11
    },
    {
      h: 2.4,
      b: 12
    },
    {
      h: 2.6,
      b: 13
    },
    {
      h: 2.8,
      b: 14
    },
    {
      h: 3.0,
      b: 15
    }
  ];

  data1copy = [
    {
      x: 0.0,
      y: 9.5
    },
    {
      x: 1.0,
      y: 6.7
    },
    {
      x: 2.3,
      y: 4.1
    },
    {
      x: 3.2,
      y: 2.34
    },
    {
      x: 4.0,
      y: -0.2
    },
    {
      x: 7.5,
      y: -0.1
    },
    {
      x: 15.0,
      y: -0.4
    },
    {
      x: 25.0,
      y: -0.35
    },
    {
      x: 35.0,
      y: -0.2
    },
    {
      x: 45.0,
      y: -0.1
    },
    {
      x: 55.0,
      y: -0.05
    },
    {
      x: 75.0,
      y: 0.21
    },
    {
      x: 80.0,
      y: 0.11
    },
    {
      x: 90.0,
      y: 0.36
    },
    {
      x: 95.0,
      y: 0.67
    },
    {
      x: 98.0,
      y: 1.15
    },
    {
      x: 100.0,
      y: 2.0
    },
    {
      x: 103.0,
      y: 4.6
    },
    {
      x: 105.0,
      y: 5.82
    },
    {
      x: 106.0,
      y: 7.2
    },
    {
      x: 108.0,
      y: 9.6
    }
  ];

  data1 = [
    {
      x: 0.0,
      y: 8.36
    },
    {
      x: 0.84,
      y: 5.896
    },
    {
      x: 1.932,
      y: 3.608
    },
    {
      x: 2.688,
      y: 2.059
    },
    {
      x: 3.36,
      y: -0.176
    },
    {
      x: 6.3,
      y: -0.088
    },
    {
      x: 12.6,
      y: -0.352
    },
    {
      x: 21,
      y: -0.308
    },
    {
      x: 29.4,
      y: -0.176
    },
    {
      x: 37.8,
      y: -0.088
    },
    {
      x: 46.2,
      y: -0.044
    },
    {
      x: 63.0,
      y: 0.183
    },
    {
      x: 67.2,
      y: 0.097
    },
    {
      x: 75.6,
      y: 0.317
    },
    {
      x: 79.8,
      y: 0.59
    },
    {
      x: 82.32,
      y: 1.012
    },
    {
      x: 84.0,
      y: 1.76
    },
    {
      x: 86.52,
      y: 4.048
    },
    {
      x: 88.2,
      y: 5.122
    },
    {
      x: 89.04,
      y: 6.34
    },
    {
      x: 90.72,
      y: 8.448
    }
  ];
  ortalamayukseklik = 0.352 + 1.85;
  maksimumyukseklik = 0.352 + 2.35;
  minimumyukseklik = 0.352 + 1.3;

  charts = [
    [
      {
        x: 2.92,
        y: this.state.minimum
      },
      {
        x: 82.97,
        y: this.state.minimum
      }
    ],
    [
      {
        x: 2.75,
        y: this.state.ortalama
      },
      {
        x: 84.1,
        y: this.state.ortalama
      }
    ],
    [
      {
        x: 2.55,
        y: this.state.maksimum
      },
      {
        x: 84.65,
        y: this.state.maksimum
      }
    ]
  ];
  kesitdegerleri;
  anahtaregrisi = [
    {
      x: 0,
      y: 0
    },
    {
      y: parseFloat(this.minimumyukseklik).toFixed(2),
      x: parseFloat(this.minimumdebi).toFixed(2)
    },
    {
      y: parseFloat(this.ortalamayukseklik).toFixed(2),
      x: parseFloat(this.ortalamadebi).toFixed(2)
    },
    {
      y: parseFloat(this.maksimumyukseklik).toFixed(2),
      x: parseFloat(this.maksimumdebi).toFixed(2)
    }
  ];
  drawchart = nextState => {
    this.multiplybyfactor(nextState);
    this.mrthales(nextState);

    new Chart(this.ctx, {
      plugins: [ChartDataLabels],
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Bağlama Enkesiti",
            data: this.data1,
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "red",
            fill: false,
            lineTension: 0,
            borderColor: "red",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          },
          {
            label: "Minimum Su Seviyesi",
            data: this.charts[0],
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "orange",
            fill: false,
            lineTension: 0,
            borderColor: "orange",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          },
          {
            label: "Ortalama Su Seviyesi",
            data: this.charts[1],
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "#731963",
            fill: false,
            lineTension: 0,
            borderColor: "#731963",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          },
          {
            label: "Maksimum Su Seviyesi",
            data: this.charts[2],
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "#72E1D1",
            fill: false,
            lineTension: 0,
            borderColor: "#72E1D1",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "EŞEL SIFIR KOTU",
                fontSize: 22,
                padding: {
                  left: 15,
                  top: 0
                }
              }
            }
          ],
          yAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "top",
              scaleLabel: {
                display: true,
                labelString: "Y",
                fontSize: 22
              }
            }
          ],
          backgroundColor: "red"
        },
        response: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 22
          }
        }
      }
    });
  };
  multiplybyfactor = nextState => {
    let mystate;

    if (isUndefined(nextState)) {
      mystate = this.state;
    } else {
      mystate = nextState;
    }
    for (let i = 0; i < this.data1.length; i++) {
      this.data1[i].x = parseFloat(
        (this.data1copy[i].x * mystate.x).toFixed(2)
      );
      this.data1[i].y = parseFloat(
        (this.data1copy[i].y * mystate.y).toFixed(2)
      );
    }
  };

  nextstateproblem = nextState => {
    if (!isUndefined(nextState)) {
      this.charts = [
        [
          {
            y: nextState.minimum
          },
          {
            y: nextState.minimum
          }
        ],
        [
          {
            y: nextState.ortalama
          },
          {
            y: nextState.ortalama
          }
        ],
        [
          {
            y: nextState.maksimum
          },
          {
            y: nextState.maksimum
          }
        ]
      ];
      this.kesitdegerleri = [
        nextState.minimum,
        nextState.ortalama,
        nextState.maksimum
      ];
    }
  };
  mrthales = nextState => {
    this.nextstateproblem(nextState);
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < this.data1.length; i++) {
        if (this.kesitdegerleri[j] > this.data1[i].y) {
          let uzunykenari = this.data1[i - 1].y - this.data1[i].y;
          let kisay = this.data1[i - 1].y - this.kesitdegerleri[j];
          let altuzunkenar = this.data1[i].x - this.data1[i - 1].x;
          let cevap = (kisay * altuzunkenar) / uzunykenari;
          cevap = cevap + this.data1[i - 1].x;

          this.charts[j][0].x = parseFloat(cevap.toFixed(2));
          for (let z = i + 1; z < this.data1.length; z++) {
            if (this.kesitdegerleri[j] < this.data1[z].y) {
              let uzunykenari1 = this.data1[z].y - this.data1[z - 1].y;
              let kisay1 = this.data1[z].y - this.kesitdegerleri[j];
              let altuzunkenar1 = this.data1[z - 1].x - this.data1[z].x;
              let cevap1 = (kisay1 * altuzunkenar1) / uzunykenari1;
              cevap1 = cevap1 + this.data1[z].x;

              this.charts[j][1].x = parseFloat(cevap1.toFixed(2));
              break;
            }
          }
          break;
        }
      }
    }
  };

  priceFormatter(cell, row) {
    if (cell > 3 && cell < 6)
      return (
        <span>
          <strong style={{ color: "green" }}>{cell}</strong>
        </span>
      );

    return <strong style={{ color: "red" }}>{cell}</strong>;
  }

  crossmetodualan = nextstate => {
    this.nextstateproblem(nextstate);
    const minimum = this.state.minimum;
    const maksimum = this.state.maksimum;
    const ortalama = this.state.ortalama;

    let cevaplar = [0, 0, 0];
    let minimumdizi = [];
    let ortalamadizi = [];
    let maksimumdizi = [];
    let i = 0;
    while (minimum < this.data1[i].y) {
      i++;
    }

    let data = {
      x: this.charts[0][0].x,
      y: minimum
    };
    minimumdizi.push(data);
    while (minimum > this.data1[i].y) {
      minimumdizi.push(this.data1[i]);
      i++;
    }
    let newdata = {
      x: this.charts[0][1].x,
      y: minimum
    };

    minimumdizi.push(newdata);
    i = 0;

    while (ortalama < this.data1[i].y) i++;

    let data1 = {
      x: this.charts[1][0].x,
      y: ortalama
    };
    ortalamadizi.push(data1);
    while (ortalama > this.data1[i].y) {
      ortalamadizi.push(this.data1[i]);
      i++;
    }

    let data2 = {
      x: this.charts[1][1].x,
      y: ortalama
    };
    ortalamadizi.push(data2);
    i = 0;

    while (maksimum < this.data1[i].y) i++;
    let data3 = {
      x: this.charts[2][0].x,
      y: maksimum
    };

    maksimumdizi.push(data3);
    while (maksimum > this.data1[i].y) {
      maksimumdizi.push(this.data1[i]);
      i++;
    }
    maksimumdizi.push({
      x: this.charts[2][1].x,
      y: maksimum
    });

    for (let j = 1; j < minimumdizi.length - 1; j++) {
      if (minimumdizi[j].y >= 0) {
        let sonuc =
          minimumdizi[j].y * (minimumdizi[j - 1].x - minimumdizi[j + 1].x);
        cevaplar[0] += sonuc;
      } else if (minimumdizi[j].y < 0) {
        let sonuc =
          minimumdizi[j].y * (minimumdizi[j - 1].x - minimumdizi[j + 1].x);

        cevaplar[0] += sonuc;
      }
    }

    if (minimumdizi[0].y < 0) {
      let sonuc =
        minimumdizi[0].y *
        (minimumdizi[minimumdizi.length - 1].x - minimumdizi[1].x);

      cevaplar[0] -= sonuc;
    } else {
      let sonuc =
        minimumdizi[0].y *
        (minimumdizi[minimumdizi.length - 1].x - minimumdizi[1].x);

      cevaplar[0] += sonuc;
    }
    if (minimumdizi[minimumdizi.length - 1].y < 0) {
      cevaplar[0] -=
        minimumdizi[minimumdizi.length - 1].y *
        (minimumdizi[minimumdizi.length - 2].x - minimumdizi[0].x);
    } else {
      cevaplar[0] +=
        minimumdizi[minimumdizi.length - 1].y *
        (minimumdizi[minimumdizi.length - 2].x - minimumdizi[0].x);
    }

    // ORTALAMA İÇİN ALAN
    for (let j = 1; j < ortalamadizi.length - 1; j++) {
      if (ortalamadizi[j].y >= 0) {
        let sonuc =
          ortalamadizi[j].y * (ortalamadizi[j - 1].x - ortalamadizi[j + 1].x);
        cevaplar[1] += sonuc;
      } else if (ortalamadizi[j].y < 0) {
        let sonuc =
          ortalamadizi[j].y * (ortalamadizi[j - 1].x - ortalamadizi[j + 1].x);

        cevaplar[1] += sonuc;
      }
    }

    if (ortalamadizi[0].y < 0) {
      let sonuc =
        ortalamadizi[0].y *
        (ortalamadizi[ortalamadizi.length - 1].x - ortalamadizi[1].x);
      cevaplar[1] -= sonuc;
    } else {
      let sonuc =
        ortalamadizi[0].y *
        (ortalamadizi[ortalamadizi.length - 1].x - ortalamadizi[1].x);
      cevaplar[1] += sonuc;
    }
    if (ortalamadizi[ortalamadizi.length - 1].y < 0) {
      cevaplar[1] -=
        ortalamadizi[ortalamadizi.length - 1].y *
        (ortalamadizi[ortalamadizi.length - 2].x - ortalamadizi[0].x);
    } else {
      cevaplar[1] +=
        ortalamadizi[ortalamadizi.length - 1].y *
        (ortalamadizi[ortalamadizi.length - 2].x - ortalamadizi[0].x);
    }

    // maksimum için alan
    for (let j = 1; j < maksimumdizi.length - 1; j++) {
      if (maksimumdizi[j].y >= 0) {
        let sonuc =
          maksimumdizi[j].y * (maksimumdizi[j - 1].x - maksimumdizi[j + 1].x);
        cevaplar[2] += sonuc;
      } else if (maksimumdizi[j].y < 0) {
        let sonuc =
          maksimumdizi[j].y * (maksimumdizi[j - 1].x - maksimumdizi[j + 1].x);

        cevaplar[2] += sonuc;
      }
    }

    if (maksimumdizi[0].y < 0) {
      let sonuc =
        maksimumdizi[0].y *
        (maksimumdizi[maksimumdizi.length - 1].x - maksimumdizi[1].x);

      cevaplar[2] -= sonuc;
    } else {
      let sonuc =
        maksimumdizi[0].y *
        (maksimumdizi[maksimumdizi.length - 1].x - maksimumdizi[1].x);

      cevaplar[2] += sonuc;
    }
    if (maksimumdizi[maksimumdizi.length - 1].y < 0) {
      cevaplar[2] -=
        maksimumdizi[maksimumdizi.length - 1].y *
        (maksimumdizi[maksimumdizi.length - 2].x - maksimumdizi[0].x);
    } else {
      cevaplar[2] +=
        maksimumdizi[maksimumdizi.length - 1].y *
        (maksimumdizi[maksimumdizi.length - 2].x - maksimumdizi[0].x);
    }

    this.minimumalan = parseFloat(cevaplar[0] / 2).toFixed(2);
    this.ortalamaalan = parseFloat(cevaplar[1] / 2).toFixed(2);
    this.maksimumalan = parseFloat(cevaplar[2] / 2).toFixed(2);
    this.yaricap();
  };
  isale_n_degerleri = new Map();

  yaricap = () => {
    this.minimumyaricap = parseFloat(
      this.minimumalan / this.minimumislakcevre
    ).toFixed(2);
    this.ortalamayaricap = parseFloat(
      this.ortalamaalan / this.ortalamaislakcevre
    ).toFixed(2);
    this.maksimumyaricap = parseFloat(
      this.maksimumalan / this.maksimumislakcevre
    ).toFixed(2);
  };
  debihesabi = nextstate => {
    if (isUndefined(nextstate)) nextstate = this.state;
    console.log(nextstate.ndegeri + "  " + nextstate.jdegeri);
    this.minimumdebi =
      (1 / nextstate.ndegeri) *
      Math.pow(this.minimumyaricap, 2 / 3) *
      Math.pow(nextstate.jdegeri, 1 / 2) *
      this.minimumalan;
    this.maksimumdebi =
      (1 / nextstate.ndegeri) *
      Math.pow(this.maksimumyaricap, 2 / 3) *
      Math.pow(nextstate.jdegeri, 1 / 2) *
      this.maksimumalan;
    this.ortalamadebi =
      (1 / nextstate.ndegeri) *
      Math.pow(this.ortalamayaricap, 2 / 3) *
      Math.pow(nextstate.jdegeri, 1 / 2) *
      this.ortalamaalan;
  };
  anahtaregrisicizdirme = hebele => {
    if (isUndefined(hebele)) {
      console.log("worked baba    ");
      this.anahtaregrisi = [
        {
          x: 0,
          y: 0
        },
        {
          y: parseFloat(this.minimumyukseklik).toFixed(2),
          x: parseFloat(this.minimumdebi).toFixed(2)
        },
        {
          y: parseFloat(this.ortalamayukseklik).toFixed(2),
          x: parseFloat(this.ortalamadebi).toFixed(2)
        },
        {
          y: parseFloat(this.maksimumyukseklik).toFixed(2),
          x: parseFloat(this.maksimumdebi).toFixed(2)
        }
      ];
    }

    new Chart(this.ctx2, {
      plugins: [ChartDataLabels],
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Anahtar Eğrisi",
            data: this.anahtaregrisi,
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "red",
            fill: false,
            lineTension: 0.5,
            borderColor: "red",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Debi",
                fontSize: 22,
                padding: {
                  left: 15,
                  top: 0
                }
              }
            }
          ],
          yAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "top",
              scaleLabel: {
                display: true,
                labelString: "Yükseklik",
                fontSize: 22
              }
            }
          ],
          backgroundColor: "red"
        },
        response: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 22
          }
        }
      }
    });
  };

  digergrafikcizdirme = hebele => {
    console.log(isUndefined(hebele));
    console.log(hebele);
    if (isUndefined(hebele)) {
      this.yukseklik_yaricapgrafigi = [
        {
          x: 0,
          y: 0
        },
        {
          y: parseFloat(this.minimumyukseklik).toFixed(2),
          x: parseFloat(this.minimumyaricap).toFixed(2)
        },
        {
          y: parseFloat(this.ortalamayukseklik).toFixed(2),
          x: parseFloat(this.ortalamayaricap).toFixed(2)
        },
        {
          y: parseFloat(this.maksimumyukseklik).toFixed(2),
          x: parseFloat(this.maksimumyaricap).toFixed(2)
        }
      ];
      this.yukseklik_alangrafigi = [
        {
          x: 0,
          y: 0
        },
        {
          y: parseFloat(this.minimumyukseklik).toFixed(2),
          x: parseFloat(this.minimumalan).toFixed(2)
        },
        {
          y: parseFloat(this.ortalamayukseklik).toFixed(2),
          x: parseFloat(this.ortalamaalan).toFixed(2)
        },
        {
          y: parseFloat(this.maksimumyukseklik).toFixed(2),
          x: parseFloat(this.maksimumalan).toFixed(2)
        }
      ];
      this.yukseklik_islakcevre = [
        {
          x: 0,
          y: 0
        },
        {
          y: parseFloat(this.minimumyukseklik).toFixed(2),
          x: parseFloat(this.minimumislakcevre).toFixed(2)
        },
        {
          y: parseFloat(this.ortalamayukseklik).toFixed(2),
          x: parseFloat(this.ortalamaislakcevre).toFixed(2)
        },
        {
          y: parseFloat(this.maksimumyukseklik).toFixed(2),
          x: parseFloat(this.maksimumislakcevre).toFixed(2)
        }
      ];
    }

    console.log(this.yukseklik_yaricapgrafigi);
    new Chart(this.ctx3, {
      plugins: [ChartDataLabels],
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Yükseklik-Yarıçap",
            data: this.yukseklik_yaricapgrafigi,
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "red",
            fill: false,
            lineTension: 0,
            borderColor: "red",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Yarıçap",
                fontSize: 22,
                padding: {
                  left: 15,
                  top: 0
                }
              }
            }
          ],
          yAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "top",
              scaleLabel: {
                display: true,
                labelString: "Yükseklik",
                fontSize: 22
              }
            }
          ],
          backgroundColor: "red"
        },
        response: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 22
          }
        }
      }
    });

    // other
    new Chart(this.ctx4, {
      plugins: [ChartDataLabels],
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Yükseklik - Alan",
            data: this.yukseklik_alangrafigi,
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "red",
            fill: false,
            lineTension: 0,
            borderColor: "red",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Alan",
                fontSize: 22,
                padding: {
                  left: 15,
                  top: 0
                }
              }
            }
          ],
          yAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "top",
              scaleLabel: {
                display: true,
                labelString: "Yükseklik",
                fontSize: 22
              }
            }
          ],
          backgroundColor: "red"
        },
        response: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 22
          }
        }
      }
    });
    new Chart(this.ctx5, {
      plugins: [ChartDataLabels],
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Yükseklik - Çevre",
            data: this.yukseklik_islakcevre,
            showLine: true,

            pointStyle: "circle",
            backgroundColor: "red",
            fill: false,
            lineTension: 0,
            borderColor: "red",
            pointRadius: 3,
            borderWidth: 3,
            datalabels: {
              formatter: function(value, context) {
                return value.x + "," + value.y;
              },

              font: {
                size: 10
              },
              align: "top"
            }
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Alan",
                fontSize: 22,
                padding: {
                  left: 15,
                  top: 0
                }
              }
            }
          ],
          yAxes: [
            {
              beginAtZero: true,
              type: "linear",
              position: "top",
              scaleLabel: {
                display: true,
                labelString: "Yükseklik",
                fontSize: 22
              }
            }
          ],
          backgroundColor: "red"
        },
        response: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 22
          }
        }
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.drawchart(nextState);

    this.islakcevrefounder(nextState);
    this.crossmetodualan();
    this.debihesabi(nextState);
    this.yukselikbul(nextState);
    this.anahtaregrisicizdirme();
    this.digergrafikcizdirme();
    return true;
  }

  componentDidMount() {
    this.ctx = document.getElementById("myChart").getContext("2d");
    this.ctx2 = document.getElementById("myChart2").getContext("2d");
    this.ctx3 = document.getElementById("myChart3").getContext("2d");
    this.ctx4 = document.getElementById("myChart4").getContext("2d");
    this.ctx5 = document.getElementById("myChart5").getContext("2d");
    this.islakcevrefounder();
    this.crossmetodualan();
    this.drawchart();
    this.anahtaregrisicizdirme("ilk");
    this.digergrafikcizdirme("ilk");
  }

  handlechange = name => event => {
    let b = parseFloat(event.target.value);
    b.toFixed(3);
    b = parseFloat(b);
    this.setState({ [name]: b });

    this.islakcevrefounder();

    event.preventDefault();
  };
  islakcevrefounder = nextState => {
    if (isUndefined(nextState)) this.nextstateproblem(nextState);
    this.islakcevre = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      let starting = 0;

      while (this.charts[i][0].y < this.data1[starting].y) starting++;

      const startingyedek = starting;
      while (this.charts[i][0].y > this.data1[starting + 1].y) {
        this.islakcevre[i] += Math.sqrt(
          Math.pow(this.data1[starting].x - this.data1[starting + 1].x, 2) +
            Math.pow(this.data1[starting].y - this.data1[starting + 1].y, 2)
        );

        starting++;
      }

      this.islakcevre[i] += Math.sqrt(
        Math.pow(this.data1[startingyedek].x - this.charts[i][0].x, 2) +
          Math.pow(this.data1[startingyedek].y - this.charts[i][0].y, 2)
      );

      this.islakcevre[i] += Math.sqrt(
        Math.pow(this.data1[starting].x - this.charts[i][1].x, 2) +
          Math.pow(this.data1[starting].y - this.charts[i][1].y, 2)
      );
    }

    this.minimumislakcevre = parseFloat(this.islakcevre[0].toFixed(2));
    this.ortalamaislakcevre = parseFloat(this.islakcevre[1].toFixed(2));
    this.maksimumislakcevre = parseFloat(this.islakcevre[2].toFixed(2));
  };
  yukselikbul = nextstate => {
    if (isUndefined(nextstate)) nextstate = this.state;
    let minimum = this.data1[0].y;
    for (let i = 1; i < this.data1.length; i++) {
      if (this.data1[i].y < minimum) {
        minimum = this.data1[i].y;
      }
    }

    this.minimumyukseklik = nextstate.minimum - minimum;
    this.ortalamayukseklik = nextstate.ortalama - minimum;
    this.maksimumyukseklik = nextstate.maksimum - minimum;
  };

  yukseklik_yaricapgrafigi = [
    {
      x: 0,
      y: 0
    },
    {
      y: this.minimumyukseklik.toFixed(2),
      x: this.minimumyaricap.toFixed(2)
    },
    {
      y: this.ortalamayukseklik.toFixed(2),
      x: this.ortalamayaricap.toFixed(2)
    },
    {
      y: this.maksimumyukseklik.toFixed(2),
      x: this.maksimumyaricap.toFixed(2)
    }
  ];
  yukseklik_alangrafigi = [
    {
      x: 0,
      y: 0
    },
    {
      y: this.minimumyukseklik.toFixed(2),
      x: this.minimumalan.toFixed(2)
    },
    {
      y: this.ortalamayukseklik.toFixed(2),
      x: this.ortalamaalan.toFixed(2)
    },
    {
      y: this.maksimumyukseklik.toFixed(2),
      x: this.maksimumalan.toFixed(2)
    }
  ];
  yukseklik_islakcevre = [
    {
      x: 0,
      y: 0
    },
    {
      y: this.minimumyukseklik.toFixed(2),
      x: this.minimumislakcevre.toFixed(2)
    },
    {
      y: this.ortalamayukseklik.toFixed(2),
      x: this.ortalamaislakcevre.toFixed(2)
    },
    {
      y: this.maksimumyukseklik.toFixed(2),
      x: this.maksimumislakcevre.toFixed(2)
    }
  ];
  componentWillUpdate() {
    this.kaplamalimikaplamasizmi();
  }
  constructor(props) {
    super(props);
    console.log("consturctor1234");
    let mx = 12;
    console.log(mx);
    console.log("hell oworld");
    this.datas = new Map();
    this.datas.set(0, this.minimumchart);
    this.datas.set(1, this.averagechart);
    this.datas.set(2, this.maximumchart);
    this.kesitdegerleri = [
      this.state.minimum,
      this.state.ortalama,
      this.state.maksimum
    ];

    this.myMap.set(
      0.029,
      "(1) Enkesit tabanı oldukça muntazam, sahilleri düz ve sağlam, hiç bitki örtüsü yok"
    );
    this.myMap.set(
      0.031,
      "(2) 1. gibi , bununlar beraber sahili bitki örtüsü ile kaplı"
    );
    this.myMap.set(
      0.033,
      "(3) Enkesitleri oldukça gayri muazzam, birkaç sahili kaymış,oyulmalar ve birikintiler mevcut"
    );
    this.myMap.set(
      0.035,
      "(4) 2.gibi, fakat kuvvetli sahil kaymaları, oyuntular ve yığıntılar mevcut"
    );
    this.myMap.set(
      0.045,
      "(5) 3. gibi, bununla beraber tabanda ve sahilde bitki mevcut"
    );
    this.myMap.set(
      0.06,
      "(6) Vahşi,derin oyulmalar, büyük taşlar ve kuvvetli sahil kaymaları mevcut"
    );
    this.mdegerli.set(0, "Kaya zemin");
    this.mdegerli.set(1.6, "Kil veya toprak");
    this.mdegerli.set(2, "Gevşek kum");
    this.mdegerli.set(3, "Çok gevşek  kum");
    this.mdegerli.set(4, "Bataklık  zemin");

  }

  componentWillMount() {
    this.kaplamalimikaplamasizmi();
  }


  kaplamalimikaplamasizmi = () => {
   this.tkr = 0.06 * (26487 - 9810) * this.state.kanald;
   console.log("baslangc");
   console.log(this.tkr);
    this.kaplamasizzemintablo= [];
    let j = 0;
    let hsondeger = this.state.hdegeri;
    for (let i = this.state.hdegeri; i <= 3.02; i += 0.02) {
      this.kaplamasizzemintablo.push({
        h: parseFloat(hsondeger).toFixed(2),
        b: Math.round(5 * hsondeger)
      });
      hsondeger += 0.02;
    }

    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      this.kaplamasizzemintablo[i].alan = parseFloat(
        this.kaplamasizzemintablo[i].h * this.kaplamasizzemintablo[i].b +
          this.state.mdegeri * Math.pow(this.kaplamasizzemintablo[i].h, 2)
      ).toFixed(2);
    }
    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      this.kaplamasizzemintablo[i].cevre = parseFloat(
        this.kaplamasizzemintablo[i].b +
          2 *
            this.kaplamasizzemintablo[i].h *
            Math.sqrt(1 + Math.pow(this.state.mdegeri, 2))
      ).toFixed(2);
    }
    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      this.kaplamasizzemintablo[i].R = parseFloat(
        this.kaplamasizzemintablo[i].alan / this.kaplamasizzemintablo[i].cevre
      ).toFixed(2);
    }
    this.isale_n_degerleri.set(0.04, "Gevşek zemin");
    this.isale_n_degerleri.set(0.033, "Toprak zemin");
    this.isale_n_degerleri.set(0.025, "Sıkı zemin");
    let qisale = this.minimumdebi * this.state.adegeri;

    let qn = qisale * this.state.ndegeriisale;
    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      let rikiboluuc =
        Math.pow(this.kaplamasizzemintablo[i].R, 2 / 3) *
        this.kaplamasizzemintablo[i].alan;

      let cevap = qn / rikiboluuc;
      let cevap2 = Math.pow(cevap, 2);
      this.kaplamasizzemintablo[i].j = parseFloat(cevap2).toFixed(5);
    }
    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      this.kaplamasizzemintablo[i].kabartmakotu = parseFloat(
        this.state.kanalinsonundakisuyuzukotu +
          this.kaplamasizzemintablo[i].j * this.state.isalekanaliuzunlugu +
          0.5
      ).toFixed(2);
    }

    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      this.kaplamasizzemintablo[i].kk_esk = parseFloat(
        this.kaplamasizzemintablo[i].kabartmakotu - this.state.eselsifirkotu
      ).toFixed(2);
    }

    // KAPLAMALI KANAL
    hsondeger = 1;
    this.kaplamalikanal= [];
    for (let i = this.state.hdegeri; i <= 3.02; i += 0.02) {
      this.kaplamalikanal.push({
        h: parseFloat(hsondeger).toFixed(2),
        b: Math.round(5 * hsondeger)
      });
      hsondeger += 0.02;
    }

    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].alan = parseFloat(
        this.kaplamalikanal[i].h * this.kaplamalikanal[i].b +
          this.state.kaplamalimdegeri *
            Math.pow(this.kaplamasizzemintablo[i].h, 2)
      ).toFixed(2);
    }
    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].cevre = parseFloat(
        this.kaplamalikanal[i].b +
          2 *
            this.kaplamalikanal[i].h *
            Math.sqrt(1 + Math.pow(this.state.kaplamalimdegeri, 2))
      ).toFixed(2);
    }
    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].R = parseFloat(
        this.kaplamalikanal[i].alan / this.kaplamalikanal[i].cevre
      ).toFixed(2);
    }
    let qisale2 = qisale * this.state.kaplamalindegeri;
    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      let rikiboluuc =
        Math.pow(this.kaplamalikanal[i].R, 2 / 3) * this.kaplamalikanal[i].alan;

      let cevap = qisale2 / rikiboluuc;
      let cevap2 = Math.pow(cevap, 2);
      this.kaplamalikanal[i].j = parseFloat(cevap2).toFixed(4);
    }
    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].hiz = parseFloat(
        qisale / this.kaplamalikanal[i].alan
      ).toFixed(4);
    }

    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].kabartmakotu = parseFloat(
        this.state.kanalinsonundakisuyuzukotu +
          this.kaplamalikanal[i].j * this.state.isalekanaliuzunlugu +
          0.5
      ).toFixed(2);
    }

    for (let i = 0; i < this.kaplamalikanal.length; i++) {
      this.kaplamalikanal[i].kk_esk = parseFloat(
        this.kaplamalikanal[i].kabartmakotu - this.state.eselsifirkotu
      ).toFixed(2);
    }

    // kaynakların sürüklenip gerimesi
    let aralik;
    let alinanr;
    let alinanj;
    for (let i = 0; i < this.kaplamasizzemintablo.length; i++) {
      if (
        this.kaplamasizzemintablo[i].kk_esk > 4 &&
        this.kaplamasizzemintablo[i].kk_esk < 6
      ) {
        aralik = this.kaplamasizzemintablo[i].kk_esk;
        alinanr = this.kaplamasizzemintablo[i].R;
        alinanj = this.kaplamasizzemintablo[i].j;
        break;
      }
    }
    console.log(this.kaplamasizzemintablo);
    console.log("aralik");
    console.log(aralik);
    this.kamplamasizto = this.state.gamasu * alinanr * alinanj;
    console.log("kaplamasız to ");
    console.log(this.kaplamsizto);
    console.log(this.tkr);


  }


  constructor2() {}
  kaplamasizzemintablo = [];
  kaplamalikanal = [];

  akarsupuruzlulugudegeri = event => {
    let a = parseFloat(event.target.value);
    this.setState({ ndegeri: a });
    event.preventDefault();
  };

  mchanger = event => {
    let a = parseFloat(event.target.value);

    this.setState({ mdegeri: a });
    event.preventDefault();
  };
  nisalechanger = event => {
    let a = parseFloat(event.target.value);

    this.setState({ ndegeriisale: a });
    event.preventDefault();
  };
  eselsifirkotu = event => {
    let a = parseFloat(event.target.value);

    this.setState({ eselsifirkotu: a });
    event.preventDefault();
  };

  isalekanaliuzunlugu = event => {
    let a = parseFloat(event.target.value);
    this.setState({ isalekanaliuzunlugu: a });
    event.preventDefault();
  };
  dchangder = event => {
    let a = parseFloat(event.target.value);
    this.setState({ kanald: a });
    event.preventDefault();
  };


  akarsuegimi = event => {
    let a = parseFloat(event.target.value);
    console.log(a + "cevap");
    this.setState({ jdegeri: a });
    event.preventDefault();

  };



  render() {
    return (
      <div className="App">
        <TextField
          id="standard-number"
          label="X KATSAYISI"
          value={this.state.x}
          onChange={this.handlechange("x")}
          type="number"
          className={"x"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          style={{
            fontSize: "26px"
          }}
          label="Y KATSAYISI"
          value={this.state.y}
          onChange={this.handlechange("y")}
          type="number"
          className={"y"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-number"
          style={{
            fontSize: "26px"
          }}
          label="Minimum"
          value={this.state.minimum}
          onChange={this.handlechange("minimum")}
          type="number"
          className={"y"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          style={{
            fontSize: "26px"
          }}
          label="Ortalama"
          value={this.state.ortalama}
          onChange={this.handlechange("ortalama")}
          type="number"
          className={"y"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          style={{
            fontSize: "26px"
          }}
          label="Maksimum"
          value={this.state.maksimum}
          onChange={this.handlechange("maksimum")}
          type="number"
          className={"y"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <br />
        <div className="myChartdiv">
          <canvas id="myChart" width="1300px" height="700px" />
        </div>
        <br />

        <br />
        <br />

        <Container>
          <Row>
            <Col>
              <div className="p-3 mb-2 bg-danger text-white">Çevre Hesabı</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Minimum Çevre</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {this.minimumislakcevre + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Ortalama Çevre</p>
            </Col>
            <Col>
              <p className="bg-primary text-white ">
                {this.ortalamaislakcevre + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white ">Maksimum Çevre</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {this.maksimumislakcevre + "m"}
              </p>
            </Col>
          </Row>
          <Row />
          <Row>
            <Col>
              <div className="p-3 mb-2 bg-danger text-white">Alan Hesabı</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Minimum Alan</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">{this.minimumalan + "m²"}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Ortalama Alan</p>
            </Col>
            <Col>
              <p className="bg-primary text-white ">
                {this.ortalamaalan + "m²"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white ">Maksimum Alan</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {this.maksimumalan + "m²"}
              </p>
            </Col>
          </Row>
          <Row />
          <Row>
            <Col>
              <div className="p-3 mb-2 bg-danger text-white">
                Yarıçap Hesabı
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Minimum Yarıçap</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {parseFloat(this.minimumyaricap).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Ortalama Yarıçap</p>
            </Col>
            <Col>
              <p className="bg-primary text-white ">
                {parseFloat(this.ortalamayaricap).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white ">Maksimum Yarıçap</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {parseFloat(this.maksimumyaricap).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <h4 className={"text-warning"}>Akarsuyunun Genel Pürüzlülüğü</h4>
              <br />
              <select
                value={this.state.ndegeri}
                className="browser-default custom-select"
                onChange={this.akarsupuruzlulugudegeri}
              >
                <option value="0.029">0.029</option>
                <option value="0.031">0.031</option>
                <option value="0.033">0.033</option>
                <option value="0.035">0.035</option>
                <option value="0.045">0.045</option>
                <option value="0.060">0.060</option>
              </select>
              <br />
              <h5 className={"text-success"} id={"hadibe"}>
                {this.myMap.get(this.state.ndegeri)}
              </h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h4 className={"text-warning"}>Akarsu Eğimi</h4>
              <br />
              <select
                value={this.state.jdegeri}
                className="browser-default custom-select"
                onChange={this.akarsuegimi}
              >
                <option value="0.0008">8.0*0.0001</option>
                <option value="0.00085">8.5*0.0001</option>
                <option value="0.0009">9.0*0.0001</option>
                <option value="0.001">10.0*0.0001</option>
                <option value="0.0011">11.0*0.0001</option>
                <option value="0.00115">11.5*0.0001</option>
                <option value="0.0012">12.0*0.0001</option>
                <option value="0.00125">12.5*0.0001</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="p-3 mb-2 bg-danger text-white">Debi Hesabı</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Minimum Debi</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {parseFloat(this.minimumdebi).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Ortalama Debi</p>
            </Col>
            <Col>
              <p className="bg-primary text-white ">
                {parseFloat(this.ortalamadebi).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white ">Maksimum Debi</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {parseFloat(this.maksimumdebi).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="p-3 mb-2 bg-danger text-white">
                Yükseklik Hesabı
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Minumum Yükseklik</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {parseFloat(this.minimumyukseklik).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white">Ortalama Yükseklik</p>
            </Col>
            <Col>
              <p className="bg-primary text-white ">
                {parseFloat(this.ortalamayukseklik).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="bg-primary text-white ">Maksimum Yükseklik</p>
            </Col>
            <Col>
              <p className="bg-primary text-white">
                {" "}
                {parseFloat(this.maksimumyukseklik).toFixed(2) + "m"}
              </p>
            </Col>
          </Row>
        </Container>
        <div className="myChartdiv23">
          <canvas id="myChart2" width="1300px" height="700px" />
        </div>

        <div className="myChartdiv24">
          <canvas id="myChart3" width="1300px" height="700px" />
        </div>

        <div className="myChartdiv25">
          <canvas id="myChart4" width="1300px" height="700px" />
        </div>

        <div className="myChartdiv26">
          <canvas id="myChart5" width="1300px" height="700px" />
        </div>
        <TextField
          id="standard-number"
          label="a değeri"
          value={this.state.adegeri}
          onChange={this.handlechange("adegeri")}
          type="number"
          className={"x"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          label="h katsayısı"
          value={this.state.hdegeri}
          onChange={this.handlechange("hdegeri")}
          type="number"
          className={"x"}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />

        <Container>
          <Col>
            <h4 className={"text-warning"}>
              Kaplamasız kanal için m değerleri
            </h4>
          </Col>
          <Row>
            <select
              value={this.state.mdegeri}
              className="browser-default custom-select"
              onChange={this.mchanger}
            >
              <option value="0">0</option>
              <option value="1.6">1.6</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </Row>
        </Container>
        <h5 className={"text-success"}>
          {this.mdegerli.get(this.state.mdegeri)}
        </h5>

        <Container>
          <Col>
            <h4 className={"text-warning"}>
              Kaplamasız kanal için n değerleri
            </h4>
          </Col>


          <Row>
            <select
              value={this.state.ndegeriisale}
              className="browser-default custom-select"
              onChange={this.nisalechanger}
            >
              <option value="0.040">0.040</option>
              <option value="0.033">0.033</option>
              <option value="0.020">0.020</option>
            </select>
            <Col>
              <h4 className={"text-success"}>
                {this.isale_n_degerleri.get(this.state.ndegeriisale)}
              </h4>
            </Col>
          </Row>
        </Container>

        <Container>
          <Col>
            <h4 className={"text-warning"}>
              Kaplamasız kanaliçin eşel sıfır kotu
            </h4>
          </Col>
          <Row>
            <select
              value={this.state.eselsifirkotu}
              className="browser-default custom-select"
              onChange={this.eselsifirkotu}
            >
              <option value="303">303</option>
              <option value="600">600</option>
              <option value="607">607</option>
              <option value="953">953</option>
              <option value="1020">1020</option>
              <option value="2000">2000</option>
            </select>
          </Row>
        </Container>
        <Container>
          <Col>
            <h4 className={"text-warning"}>İsale kanalı uzunluğu</h4>
          </Col>
          <Row>
            <select
              value={this.state.isalekanaliuzunlugu}
              className="browser-default custom-select"
              onChange={this.isalekanaliuzunlugu}
            >
              <option value="6000">6000</option>
              <option value="6500">6500</option>
              <option value="7000">7000</option>
              <option value="7500">7500</option>
              <option value="8000">8000</option>
              <option value="8500">8500</option>
              <option value="9000">9000</option>
              <option value="9500">9500</option>
              <option value="10000">10000</option>
              <option value="11000">11000</option>
              <option value="12000">12000</option>
            </select>
          </Row>
        </Container>

        <Container>
          <Col>
            <h4 className={"text-warning"}>Kaplamasız Kanal Tablosu</h4>
          </Col>
        </Container>
        <div className="container" style={{ marginTop: 50 }}>
          <BootstrapTable
            striped
            hover
            keyField="h"
            data={this.kaplamasizzemintablo}
            columns={this.colums}
            trStyle={this.rowClassNameFormat}
          />
        </div>

        <Container>
          <Col>
            <h4 className={"text-warning"}>Kaplamalı Kanal Tablosu</h4>
          </Col>
        </Container>
        <div className="container" style={{ marginTop: 50 }}>
          <BootstrapTable
            striped
            hover
            keyField="h"
            data={this.kaplamalikanal}
            columns={this.colums}
            trStyle={this.rowClassNameFormat}
          />
        </div>
        <Container />
        <Container>
        <Row></Row>
        <br />
        <select
        value={this.state.kanald}
        className="browser-default custom-select"
        onChange={this.dchangder}
      >
        <option value="0.0008">0.0008</option>
        <option value="0.00085">0.00085</option>
        <option value="0.00090">0.00090</option>
        <option value="0.00095">0.00095</option>
        <option value="0.0001">0.0001</option>
        <option value="0.00015">0.00015</option>
        

      </select>
      </Container>


        <h5 className={"text-success"}>
          {this.tkr + "<" + parseFloat(this.kamplamasizto).toFixed(3)}
        </h5>
        <h5 className={"text-success"}>Kaplamalı Seç</h5>
        <h3 className={"text-success"}>Çökeltim Havuzunun Boyutlandırılması</h3>



        <script src="https://unpkg.com/react/umd/react.production.js" />

        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" />

        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />

        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}
