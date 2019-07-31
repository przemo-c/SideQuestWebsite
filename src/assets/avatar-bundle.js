!(function(e) {
  var t = {};
  function r(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (r.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          r.d(
            i,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return i;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = "/"),
    r((r.s = 345));
})({
  169: function(e, t) {
    (THREE.LoaderUtils = {
      extractUrlBase: THREE.LoaderUtils.extractUrlBase,
      decodeText: function(e) {
        return new TextDecoder().decode(e);
      }
    }),
      (e.exports = THREE.FBXLoader = (function() {
        var e, t, r;
        function i(e) {
          this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager;
        }
        function n(e) {
          this.textureLoader = e;
        }
        function s() {}
        function a() {}
        function o() {}
        function h() {}
        function l(e, t) {
          (this.dv = new DataView(e)),
            (this.offset = 0),
            (this.littleEndian = void 0 === t || t);
        }
        function c() {}
        function u(e) {
          var t = e.match(/FBXVersion: (\d+)/);
          if (t) return parseInt(t[1]);
          throw new Error(
            "THREE.FBXLoader: Cannot find the version number for the file given."
          );
        }
        function p(e) {
          return e / 46186158e3;
        }
        (i.prototype = {
          constructor: i,
          crossOrigin: "anonymous",
          load: function(e, t, r, i) {
            console.log(e);
            var n = this,
              s = THREE.LoaderUtils.extractUrlBase(e),
              a = new THREE.FileLoader(this.manager);
            a.setResponseType("arraybuffer"),
              a.load(
                e,
                function(r) {
                  console.log(e, r);
                  try {
                    var a = n.parse(r, s);
                    t(a);
                  } catch (t) {
                    setTimeout(function() {
                      i && i(t), n.manager.itemError(e);
                    }, 0);
                  }
                },
                r,
                i
              );
          },
          setCrossOrigin: function(e) {
            return (this.crossOrigin = e), this;
          },
          parse: function(t, r) {
            if (
              (function(e) {
                var t = "Kaydara FBX Binary  \0";
                return e.byteLength >= t.length && t === T(e, 0, t.length);
              })(t)
            )
              e = new h().parse(t);
            else {
              var i = T(t);
              if (
                !(function(e) {
                  var t = [
                      "K",
                      "a",
                      "y",
                      "d",
                      "a",
                      "r",
                      "a",
                      "\\",
                      "F",
                      "B",
                      "X",
                      "\\",
                      "B",
                      "i",
                      "n",
                      "a",
                      "r",
                      "y",
                      "\\",
                      "\\"
                    ],
                    r = 0;
                  function i(t) {
                    var i = e[t - 1];
                    return (e = e.slice(r + t)), r++, i;
                  }
                  for (var n = 0; n < t.length; ++n) {
                    var s = i(1);
                    if (s === t[n]) return !1;
                  }
                  return !0;
                })(i)
              )
                throw new Error("THREE.FBXLoader: Unknown format.");
              if (u(i) < 7e3)
                throw new Error(
                  "THREE.FBXLoader: FBX version not supported, FileVersion: " +
                    u(i)
                );
              e = new o().parse(i);
            }
            return new n(
              new THREE.TextureLoader(this.manager)
                .setPath(r)
                .setCrossOrigin(this.crossOrigin)
            ).parse(e);
          }
        }),
          (n.prototype = {
            constructor: n,
            parse: function() {
              t = this.parseConnections();
              var e = this.parseImages(),
                i = this.parseTextures(e),
                n = this.parseMaterials(i),
                a = this.parseDeformers(),
                o = new s().parse(a);
              return this.parseScene(a, o, n), r;
            },
            parseConnections: function() {
              var t = new Map();
              "Connections" in e &&
                e.Connections.connections.forEach(function(e) {
                  var r = e[0],
                    i = e[1],
                    n = e[2];
                  t.has(r) || t.set(r, { parents: [], children: [] });
                  var s = { ID: i, relationship: n };
                  t.get(r).parents.push(s),
                    t.has(i) || t.set(i, { parents: [], children: [] });
                  var a = { ID: r, relationship: n };
                  t.get(i).children.push(a);
                });
              return t;
            },
            parseImages: function() {
              var t = {},
                r = {};
              if ("Video" in e.Objects) {
                var i = e.Objects.Video;
                for (var n in i) {
                  var s = i[n];
                  if (
                    ((t[(l = parseInt(n))] = s.RelativeFilename || s.Filename),
                    "Content" in s)
                  ) {
                    var a =
                        s.Content instanceof ArrayBuffer &&
                        s.Content.byteLength > 0,
                      o = "string" == typeof s.Content && "" !== s.Content;
                    if (a || o) {
                      var h = this.parseImage(i[n]);
                      r[s.RelativeFilename || s.Filename] = h;
                    }
                  }
                }
              }
              for (var l in t) {
                var c = t[l];
                void 0 !== r[c]
                  ? (t[l] = r[c])
                  : (t[l] = t[l].split("\\").pop());
              }
              return t;
            },
            parseImage: function(e) {
              var t,
                r = e.Content,
                i = e.RelativeFilename || e.Filename,
                n = i.slice(i.lastIndexOf(".") + 1).toLowerCase();
              switch (n) {
                case "bmp":
                  t = "image/bmp";
                  break;
                case "jpg":
                case "jpeg":
                  t = "image/jpeg";
                  break;
                case "png":
                  t = "image/png";
                  break;
                case "tif":
                  t = "image/tiff";
                  break;
                case "tga":
                  if ("function" != typeof THREE.TGALoader)
                    return void console.warn(
                      "FBXLoader: THREE.TGALoader is required to load TGA textures"
                    );
                  null === THREE.Loader.Handlers.get(".tga") &&
                    THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader()),
                    (t = "image/tga");
                  break;
                default:
                  return void console.warn(
                    'FBXLoader: Image type "' + n + '" is not supported.'
                  );
              }
              if ("string" == typeof r) return "data:" + t + ";base64," + r;
              var s = new Uint8Array(r);
              return window.URL.createObjectURL(new Blob([s], { type: t }));
            },
            parseTextures: function(t) {
              var r = new Map();
              if ("Texture" in e.Objects) {
                var i = e.Objects.Texture;
                for (var n in i) {
                  var s = this.parseTexture(i[n], t);
                  r.set(parseInt(n), s);
                }
              }
              return r;
            },
            parseTexture: function(e, t) {
              var r = this.loadTexture(e, t);
              (r.ID = e.id), (r.name = e.attrName);
              var i = e.WrapModeU,
                n = e.WrapModeV,
                s = void 0 !== i ? i.value : 0,
                a = void 0 !== n ? n.value : 0;
              if (
                ((r.wrapS =
                  0 === s ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping),
                (r.wrapT =
                  0 === a ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping),
                "Scaling" in e)
              ) {
                var o = e.Scaling.value;
                (r.repeat.x = o[0]), (r.repeat.y = o[1]);
              }
              return r;
            },
            loadTexture: function(e, r) {
              var i,
                n,
                s = this.textureLoader.path,
                a = t.get(e.id).children;
              void 0 !== a &&
                a.length > 0 &&
                void 0 !== r[a[0].ID] &&
                ((0 !== (i = r[a[0].ID]).indexOf("blob:") &&
                  0 !== i.indexOf("data:")) ||
                  this.textureLoader.setPath(void 0));
              var o = e.FileName.slice(-3).toLowerCase();
              if ("tga" === o) {
                var h = THREE.Loader.Handlers.get(".tga");
                null === h
                  ? (console.warn(
                      "FBXLoader: TGALoader not found, creating empty placeholder texture for",
                      i
                    ),
                    (n = new THREE.Texture()))
                  : (n = h.load(i));
              } else
                "psd" === o
                  ? (console.warn(
                      "FBXLoader: PSD textures are not supported, creating empty placeholder texture for",
                      i
                    ),
                    (n = new THREE.Texture()))
                  : (n = this.textureLoader.load(i));
              return this.textureLoader.setPath(s), n;
            },
            parseMaterials: function(t) {
              var r = new Map();
              if ("Material" in e.Objects) {
                var i = e.Objects.Material;
                for (var n in i) {
                  var s = this.parseMaterial(i[n], t);
                  null !== s && r.set(parseInt(n), s);
                }
              }
              return r;
            },
            parseMaterial: function(e, r) {
              var i = e.id,
                n = e.attrName,
                s = e.ShadingModel;
              if (("object" == typeof s && (s = s.value), !t.has(i)))
                return null;
              var a,
                o = this.parseParameters(e, r, i);
              switch (s.toLowerCase()) {
                case "phong":
                  a = new THREE.MeshPhongMaterial();
                  break;
                case "lambert":
                  a = new THREE.MeshLambertMaterial();
                  break;
                default:
                  console.warn(
                    'THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',
                    s
                  ),
                    (a = new THREE.MeshPhongMaterial({ color: 3342591 }));
              }
              return a.setValues(o), (a.name = n), a;
            },
            parseParameters: function(e, r, i) {
              var n = {};
              e.BumpFactor && (n.bumpScale = e.BumpFactor.value),
                e.Diffuse
                  ? (n.color = new THREE.Color().fromArray(e.Diffuse.value))
                  : e.DiffuseColor &&
                    "Color" === e.DiffuseColor.type &&
                    (n.color = new THREE.Color().fromArray(
                      e.DiffuseColor.value
                    )),
                e.DisplacementFactor &&
                  (n.displacementScale = e.DisplacementFactor.value),
                e.Emissive
                  ? (n.emissive = new THREE.Color().fromArray(e.Emissive.value))
                  : e.EmissiveColor &&
                    "Color" === e.EmissiveColor.type &&
                    (n.emissive = new THREE.Color().fromArray(
                      e.EmissiveColor.value
                    )),
                e.EmissiveFactor &&
                  (n.emissiveIntensity = parseFloat(e.EmissiveFactor.value)),
                e.Opacity && (n.opacity = parseFloat(e.Opacity.value)),
                n.opacity < 1 && (n.transparent = !0),
                e.ReflectionFactor &&
                  (n.reflectivity = e.ReflectionFactor.value),
                e.Shininess && (n.shininess = e.Shininess.value),
                e.Specular
                  ? (n.specular = new THREE.Color().fromArray(e.Specular.value))
                  : e.SpecularColor &&
                    "Color" === e.SpecularColor.type &&
                    (n.specular = new THREE.Color().fromArray(
                      e.SpecularColor.value
                    ));
              var s = this;
              return (
                t.get(i).children.forEach(function(e) {
                  var t = e.relationship;
                  switch (t) {
                    case "Bump":
                      n.bumpMap = s.getTexture(r, e.ID);
                      break;
                    case "DiffuseColor":
                      n.map = s.getTexture(r, e.ID);
                      break;
                    case "DisplacementColor":
                      n.displacementMap = s.getTexture(r, e.ID);
                      break;
                    case "EmissiveColor":
                      n.emissiveMap = s.getTexture(r, e.ID);
                      break;
                    case "NormalMap":
                      n.normalMap = s.getTexture(r, e.ID);
                      break;
                    case "ReflectionColor":
                      (n.envMap = s.getTexture(r, e.ID)),
                        (n.envMap.mapping =
                          THREE.EquirectangularReflectionMapping);
                      break;
                    case "SpecularColor":
                      n.specularMap = s.getTexture(r, e.ID);
                      break;
                    case "TransparentColor":
                      (n.alphaMap = s.getTexture(r, e.ID)),
                        (n.transparent = !0);
                      break;
                    case "AmbientColor":
                    case "ShininessExponent":
                    case "SpecularFactor":
                    case "VectorDisplacementColor":
                    default:
                      console.warn(
                        "THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",
                        t
                      );
                  }
                }),
                n
              );
            },
            getTexture: function(r, i) {
              return (
                "LayeredTexture" in e.Objects &&
                  i in e.Objects.LayeredTexture &&
                  (console.warn(
                    "THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."
                  ),
                  (i = t.get(i).children[0].ID)),
                r.get(i)
              );
            },
            parseDeformers: function() {
              var r = {},
                i = {};
              if ("Deformer" in e.Objects) {
                var n = e.Objects.Deformer;
                for (var s in n) {
                  var a = n[s],
                    o = t.get(parseInt(s));
                  if ("Skin" === a.attrType) {
                    var h = this.parseSkeleton(o, n);
                    (h.ID = s),
                      o.parents.length > 1 &&
                        console.warn(
                          "THREE.FBXLoader: skeleton attached to more than one geometry is not supported."
                        ),
                      (h.geometryID = o.parents[0].ID),
                      (r[s] = h);
                  } else if ("BlendShape" === a.attrType) {
                    var l = { id: s };
                    (l.rawTargets = this.parseMorphTargets(o, n)),
                      (l.id = s),
                      o.parents.length > 1 &&
                        console.warn(
                          "THREE.FBXLoader: morph target attached to more than one geometry is not supported."
                        ),
                      (i[s] = l);
                  }
                }
              }
              return { skeletons: r, morphTargets: i };
            },
            parseSkeleton: function(e, t) {
              var r = [];
              return (
                e.children.forEach(function(e) {
                  var i = t[e.ID];
                  if ("Cluster" === i.attrType) {
                    var n = {
                      ID: e.ID,
                      indices: [],
                      weights: [],
                      transform: new THREE.Matrix4().fromArray(i.Transform.a),
                      transformLink: new THREE.Matrix4().fromArray(
                        i.TransformLink.a
                      ),
                      linkMode: i.Mode
                    };
                    "Indexes" in i &&
                      ((n.indices = i.Indexes.a), (n.weights = i.Weights.a)),
                      r.push(n);
                  }
                }),
                { rawBones: r, bones: [] }
              );
            },
            parseMorphTargets: function(e, r) {
              for (var i = [], n = 0; n < e.children.length; n++) {
                if (8 === n) {
                  console.warn(
                    "FBXLoader: maximum of 8 morph targets supported. Ignoring additional targets."
                  );
                  break;
                }
                var s = e.children[n],
                  a = r[s.ID],
                  o = {
                    name: a.attrName,
                    initialWeight: a.DeformPercent,
                    id: a.id,
                    fullWeights: a.FullWeights.a
                  };
                if ("BlendShapeChannel" !== a.attrType) return;
                t.get(parseInt(s.ID)).children.forEach(function(e) {
                  void 0 === e.relationship && (o.geoID = e.ID);
                }),
                  i.push(o);
              }
              return i;
            },
            parseScene: function(i, n, s) {
              r = new THREE.Group();
              var o = this.parseModels(i.skeletons, n, s),
                h = e.Objects.Model,
                l = this;
              o.forEach(function(e) {
                var i = h[e.ID];
                l.setLookAtProperties(e, i),
                  t.get(e.ID).parents.forEach(function(t) {
                    var r = o.get(t.ID);
                    void 0 !== r && r.add(e);
                  }),
                  null === e.parent && r.add(e);
              }),
                this.bindSkeleton(i.skeletons, n, o),
                this.createAmbientLight(),
                this.setupMorphMaterials();
              var c = new a().parse();
              1 === r.children.length &&
                r.children[0].isGroup &&
                ((r.children[0].animations = c), (r = r.children[0])),
                (r.animations = c);
            },
            parseModels: function(r, i, n) {
              var s = new Map(),
                a = e.Objects.Model;
              for (var o in a) {
                var h = parseInt(o),
                  l = a[o],
                  c = t.get(h),
                  u = this.buildSkeleton(c, r, h, l.attrName);
                if (!u) {
                  switch (l.attrType) {
                    case "Camera":
                      u = this.createCamera(c);
                      break;
                    case "Light":
                      u = this.createLight(c);
                      break;
                    case "Mesh":
                      u = this.createMesh(c, i, n);
                      break;
                    case "NurbsCurve":
                      u = this.createCurve(c, i);
                      break;
                    case "LimbNode":
                    case "Null":
                    default:
                      u = new THREE.Group();
                  }
                  (u.name = THREE.PropertyBinding.sanitizeNodeName(l.attrName)),
                    (u.ID = h);
                }
                this.setModelTransforms(u, l), s.set(h, u);
              }
              return s;
            },
            buildSkeleton: function(e, t, r, i) {
              var n = null;
              return (
                e.parents.forEach(function(e) {
                  for (var s in t) {
                    var a = t[s];
                    a.rawBones.forEach(function(t, s) {
                      if (t.ID === e.ID) {
                        var o = n;
                        (n = new THREE.Bone()).matrixWorld.copy(
                          t.transformLink
                        ),
                          (n.name = THREE.PropertyBinding.sanitizeNodeName(i)),
                          (n.ID = r),
                          (a.bones[s] = n),
                          null !== o && n.add(o);
                      }
                    });
                  }
                }),
                n
              );
            },
            createCamera: function(t) {
              var r, i;
              if (
                (t.children.forEach(function(t) {
                  var r = e.Objects.NodeAttribute[t.ID];
                  void 0 !== r && (i = r);
                }),
                void 0 === i)
              )
                r = new THREE.Object3D();
              else {
                var n = 0;
                void 0 !== i.CameraProjectionType &&
                  1 === i.CameraProjectionType.value &&
                  (n = 1);
                var s = 1;
                void 0 !== i.NearPlane && (s = i.NearPlane.value / 1e3);
                var a = 1e3;
                void 0 !== i.FarPlane && (a = i.FarPlane.value / 1e3);
                var o = window.innerWidth,
                  h = window.innerHeight;
                void 0 !== i.AspectWidth &&
                  void 0 !== i.AspectHeight &&
                  ((o = i.AspectWidth.value), (h = i.AspectHeight.value));
                var l = o / h,
                  c = 45;
                void 0 !== i.FieldOfView && (c = i.FieldOfView.value);
                var u = i.FocalLength ? i.FocalLength.value : null;
                switch (n) {
                  case 0:
                    (r = new THREE.PerspectiveCamera(c, l, s, a)),
                      null !== u && r.setFocalLength(u);
                    break;
                  case 1:
                    r = new THREE.OrthographicCamera(
                      -o / 2,
                      o / 2,
                      h / 2,
                      -h / 2,
                      s,
                      a
                    );
                    break;
                  default:
                    console.warn(
                      "THREE.FBXLoader: Unknown camera type " + n + "."
                    ),
                      (r = new THREE.Object3D());
                }
              }
              return r;
            },
            createLight: function(t) {
              var r, i;
              if (
                (t.children.forEach(function(t) {
                  var r = e.Objects.NodeAttribute[t.ID];
                  void 0 !== r && (i = r);
                }),
                void 0 === i)
              )
                r = new THREE.Object3D();
              else {
                var n;
                n = void 0 === i.LightType ? 0 : i.LightType.value;
                var s = 16777215;
                void 0 !== i.Color &&
                  (s = new THREE.Color().fromArray(i.Color.value));
                var a = void 0 === i.Intensity ? 1 : i.Intensity.value / 100;
                void 0 !== i.CastLightOnObject &&
                  0 === i.CastLightOnObject.value &&
                  (a = 0);
                var o = 0;
                void 0 !== i.FarAttenuationEnd &&
                  (o =
                    void 0 !== i.EnableFarAttenuation &&
                    0 === i.EnableFarAttenuation.value
                      ? 0
                      : i.FarAttenuationEnd.value);
                switch (n) {
                  case 0:
                    r = new THREE.PointLight(s, a, o, 1);
                    break;
                  case 1:
                    r = new THREE.DirectionalLight(s, a);
                    break;
                  case 2:
                    var h = Math.PI / 3;
                    void 0 !== i.InnerAngle &&
                      (h = THREE.Math.degToRad(i.InnerAngle.value));
                    var l = 0;
                    void 0 !== i.OuterAngle &&
                      ((l = THREE.Math.degToRad(i.OuterAngle.value)),
                      (l = Math.max(l, 1))),
                      (r = new THREE.SpotLight(s, a, o, h, l, 1));
                    break;
                  default:
                    console.warn(
                      "THREE.FBXLoader: Unknown light type " +
                        i.LightType.value +
                        ", defaulting to a THREE.PointLight."
                    ),
                      (r = new THREE.PointLight(s, a));
                }
                void 0 !== i.CastShadows &&
                  1 === i.CastShadows.value &&
                  (r.castShadow = !0);
              }
              return r;
            },
            createMesh: function(e, t, r) {
              var i,
                n = null,
                s = null,
                a = [];
              return (
                e.children.forEach(function(e) {
                  t.has(e.ID) && (n = t.get(e.ID)),
                    r.has(e.ID) && a.push(r.get(e.ID));
                }),
                a.length > 1
                  ? (s = a)
                  : a.length > 0
                  ? (s = a[0])
                  : ((s = new THREE.MeshPhongMaterial({ color: 13421772 })),
                    a.push(s)),
                "color" in n.attributes &&
                  a.forEach(function(e) {
                    e.vertexColors = THREE.VertexColors;
                  }),
                n.FBX_Deformer
                  ? (a.forEach(function(e) {
                      e.skinning = !0;
                    }),
                    (i = new THREE.SkinnedMesh(n, s)))
                  : (i = new THREE.Mesh(n, s)),
                i
              );
            },
            createCurve: function(e, t) {
              var r = e.children.reduce(function(e, r) {
                  return t.has(r.ID) && (e = t.get(r.ID)), e;
                }, null),
                i = new THREE.LineBasicMaterial({
                  color: 3342591,
                  linewidth: 1
                });
              return new THREE.Line(r, i);
            },
            setModelTransforms: function(e, t) {
              var r = {};
              "RotationOrder" in t &&
                (r.eulerOrder = parseInt(t.RotationOrder.value)),
                "Lcl_Translation" in t &&
                  (r.translation = t.Lcl_Translation.value),
                "RotationOffset" in t &&
                  (r.rotationOffset = t.RotationOffset.value),
                "Lcl_Rotation" in t && (r.rotation = t.Lcl_Rotation.value),
                "PreRotation" in t && (r.preRotation = t.PreRotation.value),
                "PostRotation" in t && (r.postRotation = t.PostRotation.value),
                "Lcl_Scaling" in t && (r.scale = t.Lcl_Scaling.value);
              var i = w(r);
              e.applyMatrix(i);
            },
            setLookAtProperties: function(i, n) {
              "LookAtProperty" in n &&
                t.get(i.ID).children.forEach(function(t) {
                  if ("LookAtProperty" === t.relationship) {
                    var n = e.Objects.Model[t.ID];
                    if ("Lcl_Translation" in n) {
                      var s = n.Lcl_Translation.value;
                      void 0 !== i.target
                        ? (i.target.position.fromArray(s), r.add(i.target))
                        : i.lookAt(new THREE.Vector3().fromArray(s));
                    }
                  }
                });
            },
            bindSkeleton: function(e, r, i) {
              var n = this.parsePoseNodes();
              for (var s in e) {
                var a = e[s];
                t.get(parseInt(a.ID)).parents.forEach(function(e) {
                  if (r.has(e.ID)) {
                    var s = e.ID;
                    t.get(s).parents.forEach(function(e) {
                      i.has(e.ID) &&
                        i.get(e.ID).bind(new THREE.Skeleton(a.bones), n[e.ID]);
                    });
                  }
                });
              }
            },
            parsePoseNodes: function() {
              var t = {};
              if ("Pose" in e.Objects) {
                var r = e.Objects.Pose;
                for (var i in r)
                  if ("BindPose" === r[i].attrType) {
                    var n = r[i].PoseNode;
                    Array.isArray(n)
                      ? n.forEach(function(e) {
                          t[e.Node] = new THREE.Matrix4().fromArray(e.Matrix.a);
                        })
                      : (t[n.Node] = new THREE.Matrix4().fromArray(n.Matrix.a));
                  }
              }
              return t;
            },
            createAmbientLight: function() {
              if ("GlobalSettings" in e && "AmbientColor" in e.GlobalSettings) {
                var t = e.GlobalSettings.AmbientColor.value,
                  i = t[0],
                  n = t[1],
                  s = t[2];
                if (0 !== i || 0 !== n || 0 !== s) {
                  var a = new THREE.Color(i, n, s);
                  r.add(new THREE.AmbientLight(a, 1));
                }
              }
            },
            setupMorphMaterials: function() {
              r.traverse(function(e) {
                if (
                  e.isMesh &&
                  (e.geometry.morphAttributes.position ||
                    e.geometry.morphAttributes.normal)
                ) {
                  var t = e.uuid,
                    i = e.material.uuid,
                    n = !1;
                  r.traverse(function(e) {
                    e.isMesh &&
                      e.material.uuid === i &&
                      e.uuid !== t &&
                      (n = !0);
                  }),
                    !0 === n && (e.material = e.material.clone()),
                    (e.material.morphTargets = !0);
                }
              });
            }
          }),
          (s.prototype = {
            constructor: s,
            parse: function(r) {
              var i = new Map();
              if ("Geometry" in e.Objects) {
                var n = e.Objects.Geometry;
                for (var s in n) {
                  var a = t.get(parseInt(s)),
                    o = this.parseGeometry(a, n[s], r);
                  i.set(parseInt(s), o);
                }
              }
              return i;
            },
            parseGeometry: function(e, t, r) {
              switch (t.attrType) {
                case "Mesh":
                  return this.parseMeshGeometry(e, t, r);
                case "NurbsCurve":
                  return this.parseNurbsGeometry(t);
              }
            },
            parseMeshGeometry: function(t, r, i) {
              var n = i.skeletons,
                s = i.morphTargets,
                a = t.parents.map(function(t) {
                  return e.Objects.Model[t.ID];
                });
              if (0 !== a.length) {
                var o = t.children.reduce(function(e, t) {
                    return void 0 !== n[t.ID] && (e = n[t.ID]), e;
                  }, null),
                  h = t.children.reduce(function(e, t) {
                    return void 0 !== s[t.ID] && (e = s[t.ID]), e;
                  }, null),
                  l = a[0],
                  c = {};
                "RotationOrder" in l && (c.eulerOrder = l.RotationOrder.value),
                  "GeometricTranslation" in l &&
                    (c.translation = l.GeometricTranslation.value),
                  "GeometricRotation" in l &&
                    (c.rotation = l.GeometricRotation.value),
                  "GeometricScaling" in l &&
                    (c.scale = l.GeometricScaling.value);
                var u = w(c);
                return this.genGeometry(r, o, h, u);
              }
            },
            genGeometry: function(e, t, r, i) {
              var n = new THREE.BufferGeometry();
              e.attrName && (n.name = e.attrName);
              var s = this.parseGeoNode(e, t),
                a = this.genBuffers(s),
                o = new THREE.Float32BufferAttribute(a.vertex, 3);
              if (
                (i.applyToBufferAttribute(o),
                n.addAttribute("position", o),
                a.colors.length > 0 &&
                  n.addAttribute(
                    "color",
                    new THREE.Float32BufferAttribute(a.colors, 3)
                  ),
                t &&
                  (n.addAttribute(
                    "skinIndex",
                    new THREE.Uint16BufferAttribute(a.weightsIndices, 4)
                  ),
                  n.addAttribute(
                    "skinWeight",
                    new THREE.Float32BufferAttribute(a.vertexWeights, 4)
                  ),
                  (n.FBX_Deformer = t)),
                a.normal.length > 0)
              ) {
                var h = new THREE.Float32BufferAttribute(a.normal, 3);
                new THREE.Matrix3()
                  .getNormalMatrix(i)
                  .applyToBufferAttribute(h),
                  n.addAttribute("normal", h);
              }
              if (
                (a.uvs.forEach(function(e, t) {
                  var r = "uv" + (t + 1).toString();
                  0 === t && (r = "uv"),
                    n.addAttribute(
                      r,
                      new THREE.Float32BufferAttribute(a.uvs[t], 2)
                    );
                }),
                s.material && "AllSame" !== s.material.mappingType)
              ) {
                var l = a.materialIndex[0],
                  c = 0;
                if (
                  (a.materialIndex.forEach(function(e, t) {
                    e !== l && (n.addGroup(c, t - c, l), (l = e), (c = t));
                  }),
                  n.groups.length > 0)
                ) {
                  var u = n.groups[n.groups.length - 1],
                    p = u.start + u.count;
                  p !== a.materialIndex.length &&
                    n.addGroup(p, a.materialIndex.length - p, l);
                }
                0 === n.groups.length &&
                  n.addGroup(0, a.materialIndex.length, a.materialIndex[0]);
              }
              return this.addMorphTargets(n, e, r, i), n;
            },
            parseGeoNode: function(e, t) {
              var r = {};
              if (
                ((r.vertexPositions =
                  void 0 !== e.Vertices ? e.Vertices.a : []),
                (r.vertexIndices =
                  void 0 !== e.PolygonVertexIndex
                    ? e.PolygonVertexIndex.a
                    : []),
                e.LayerElementColor &&
                  (r.color = this.parseVertexColors(e.LayerElementColor[0])),
                e.LayerElementMaterial &&
                  (r.material = this.parseMaterialIndices(
                    e.LayerElementMaterial[0]
                  )),
                e.LayerElementNormal &&
                  (r.normal = this.parseNormals(e.LayerElementNormal[0])),
                e.LayerElementUV)
              ) {
                r.uv = [];
                for (var i = 0; e.LayerElementUV[i]; )
                  r.uv.push(this.parseUVs(e.LayerElementUV[i])), i++;
              }
              return (
                (r.weightTable = {}),
                null !== t &&
                  ((r.skeleton = t),
                  t.rawBones.forEach(function(e, t) {
                    e.indices.forEach(function(i, n) {
                      void 0 === r.weightTable[i] && (r.weightTable[i] = []),
                        r.weightTable[i].push({ id: t, weight: e.weights[n] });
                    });
                  })),
                r
              );
            },
            genBuffers: function(e) {
              var t = {
                  vertex: [],
                  normal: [],
                  colors: [],
                  uvs: [],
                  materialIndex: [],
                  vertexWeights: [],
                  weightsIndices: []
                },
                r = 0,
                i = 0,
                n = !1,
                s = [],
                a = [],
                o = [],
                h = [],
                l = [],
                c = [],
                u = this;
              return (
                e.vertexIndices.forEach(function(p, d) {
                  var m = !1;
                  p < 0 && ((p ^= -1), (m = !0));
                  var f = [],
                    v = [];
                  if ((s.push(3 * p, 3 * p + 1, 3 * p + 2), e.color)) {
                    var y = g(d, r, p, e.color);
                    o.push(y[0], y[1], y[2]);
                  }
                  if (e.skeleton) {
                    if (
                      (void 0 !== e.weightTable[p] &&
                        e.weightTable[p].forEach(function(e) {
                          v.push(e.weight), f.push(e.id);
                        }),
                      v.length > 4)
                    ) {
                      n ||
                        (console.warn(
                          "THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."
                        ),
                        (n = !0));
                      var E = [0, 0, 0, 0],
                        w = [0, 0, 0, 0];
                      v.forEach(function(e, t) {
                        var r = e,
                          i = f[t];
                        w.forEach(function(e, t, n) {
                          if (r > e) {
                            (n[t] = r), (r = e);
                            var s = E[t];
                            (E[t] = i), (i = s);
                          }
                        });
                      }),
                        (f = E),
                        (v = w);
                    }
                    for (; v.length < 4; ) v.push(0), f.push(0);
                    for (var x = 0; x < 4; ++x) l.push(v[x]), c.push(f[x]);
                  }
                  if (e.normal) {
                    y = g(d, r, p, e.normal);
                    a.push(y[0], y[1], y[2]);
                  }
                  if (e.material && "AllSame" !== e.material.mappingType)
                    var b = g(d, r, p, e.material)[0];
                  e.uv &&
                    e.uv.forEach(function(e, t) {
                      var i = g(d, r, p, e);
                      void 0 === h[t] && (h[t] = []),
                        h[t].push(i[0]),
                        h[t].push(i[1]);
                    }),
                    i++,
                    m &&
                      (u.genFace(t, e, s, b, a, o, h, l, c, i),
                      r++,
                      (i = 0),
                      (s = []),
                      (a = []),
                      (o = []),
                      (h = []),
                      (l = []),
                      (c = []));
                }),
                t
              );
            },
            genFace: function(e, t, r, i, n, s, a, o, h, l) {
              for (var c = 2; c < l; c++)
                e.vertex.push(t.vertexPositions[r[0]]),
                  e.vertex.push(t.vertexPositions[r[1]]),
                  e.vertex.push(t.vertexPositions[r[2]]),
                  e.vertex.push(t.vertexPositions[r[3 * (c - 1)]]),
                  e.vertex.push(t.vertexPositions[r[3 * (c - 1) + 1]]),
                  e.vertex.push(t.vertexPositions[r[3 * (c - 1) + 2]]),
                  e.vertex.push(t.vertexPositions[r[3 * c]]),
                  e.vertex.push(t.vertexPositions[r[3 * c + 1]]),
                  e.vertex.push(t.vertexPositions[r[3 * c + 2]]),
                  t.skeleton &&
                    (e.vertexWeights.push(o[0]),
                    e.vertexWeights.push(o[1]),
                    e.vertexWeights.push(o[2]),
                    e.vertexWeights.push(o[3]),
                    e.vertexWeights.push(o[4 * (c - 1)]),
                    e.vertexWeights.push(o[4 * (c - 1) + 1]),
                    e.vertexWeights.push(o[4 * (c - 1) + 2]),
                    e.vertexWeights.push(o[4 * (c - 1) + 3]),
                    e.vertexWeights.push(o[4 * c]),
                    e.vertexWeights.push(o[4 * c + 1]),
                    e.vertexWeights.push(o[4 * c + 2]),
                    e.vertexWeights.push(o[4 * c + 3]),
                    e.weightsIndices.push(h[0]),
                    e.weightsIndices.push(h[1]),
                    e.weightsIndices.push(h[2]),
                    e.weightsIndices.push(h[3]),
                    e.weightsIndices.push(h[4 * (c - 1)]),
                    e.weightsIndices.push(h[4 * (c - 1) + 1]),
                    e.weightsIndices.push(h[4 * (c - 1) + 2]),
                    e.weightsIndices.push(h[4 * (c - 1) + 3]),
                    e.weightsIndices.push(h[4 * c]),
                    e.weightsIndices.push(h[4 * c + 1]),
                    e.weightsIndices.push(h[4 * c + 2]),
                    e.weightsIndices.push(h[4 * c + 3])),
                  t.color &&
                    (e.colors.push(s[0]),
                    e.colors.push(s[1]),
                    e.colors.push(s[2]),
                    e.colors.push(s[3 * (c - 1)]),
                    e.colors.push(s[3 * (c - 1) + 1]),
                    e.colors.push(s[3 * (c - 1) + 2]),
                    e.colors.push(s[3 * c]),
                    e.colors.push(s[3 * c + 1]),
                    e.colors.push(s[3 * c + 2])),
                  t.material &&
                    "AllSame" !== t.material.mappingType &&
                    (e.materialIndex.push(i),
                    e.materialIndex.push(i),
                    e.materialIndex.push(i)),
                  t.normal &&
                    (e.normal.push(n[0]),
                    e.normal.push(n[1]),
                    e.normal.push(n[2]),
                    e.normal.push(n[3 * (c - 1)]),
                    e.normal.push(n[3 * (c - 1) + 1]),
                    e.normal.push(n[3 * (c - 1) + 2]),
                    e.normal.push(n[3 * c]),
                    e.normal.push(n[3 * c + 1]),
                    e.normal.push(n[3 * c + 2])),
                  t.uv &&
                    t.uv.forEach(function(t, r) {
                      void 0 === e.uvs[r] && (e.uvs[r] = []),
                        e.uvs[r].push(a[r][0]),
                        e.uvs[r].push(a[r][1]),
                        e.uvs[r].push(a[r][2 * (c - 1)]),
                        e.uvs[r].push(a[r][2 * (c - 1) + 1]),
                        e.uvs[r].push(a[r][2 * c]),
                        e.uvs[r].push(a[r][2 * c + 1]);
                    });
            },
            addMorphTargets: function(t, r, i, n) {
              if (null !== i) {
                (t.morphAttributes.position = []),
                  (t.morphAttributes.normal = []);
                var s = this;
                i.rawTargets.forEach(function(i) {
                  var a = e.Objects.Geometry[i.geoID];
                  void 0 !== a && s.genMorphGeometry(t, r, a, n);
                });
              }
            },
            genMorphGeometry: function(e, t, r, i) {
              var n = new THREE.BufferGeometry();
              r.attrName && (n.name = r.attrName);
              for (
                var s =
                    void 0 !== t.PolygonVertexIndex
                      ? t.PolygonVertexIndex.a
                      : [],
                  a = void 0 !== t.Vertices ? t.Vertices.a.slice() : [],
                  o = void 0 !== r.Vertices ? r.Vertices.a : [],
                  h = void 0 !== r.Indexes ? r.Indexes.a : [],
                  l = 0;
                l < h.length;
                l++
              ) {
                var c = 3 * h[l];
                (a[c] += o[3 * l]),
                  (a[c + 1] += o[3 * l + 1]),
                  (a[c + 2] += o[3 * l + 2]);
              }
              var u = { vertexIndices: s, vertexPositions: a },
                p = this.genBuffers(u),
                d = new THREE.Float32BufferAttribute(p.vertex, 3);
              (d.name = r.attrName),
                i.applyToBufferAttribute(d),
                e.morphAttributes.position.push(d);
            },
            parseNormals: function(e) {
              var t = e.MappingInformationType,
                r = e.ReferenceInformationType,
                i = e.Normals.a,
                n = [];
              return (
                "IndexToDirect" === r &&
                  ("NormalIndex" in e
                    ? (n = e.NormalIndex.a)
                    : "NormalsIndex" in e && (n = e.NormalsIndex.a)),
                {
                  dataSize: 3,
                  buffer: i,
                  indices: n,
                  mappingType: t,
                  referenceType: r
                }
              );
            },
            parseUVs: function(e) {
              var t = e.MappingInformationType,
                r = e.ReferenceInformationType,
                i = e.UV.a,
                n = [];
              return (
                "IndexToDirect" === r && (n = e.UVIndex.a),
                {
                  dataSize: 2,
                  buffer: i,
                  indices: n,
                  mappingType: t,
                  referenceType: r
                }
              );
            },
            parseVertexColors: function(e) {
              var t = e.MappingInformationType,
                r = e.ReferenceInformationType,
                i = e.Colors.a,
                n = [];
              return (
                "IndexToDirect" === r && (n = e.ColorIndex.a),
                {
                  dataSize: 4,
                  buffer: i,
                  indices: n,
                  mappingType: t,
                  referenceType: r
                }
              );
            },
            parseMaterialIndices: function(e) {
              var t = e.MappingInformationType,
                r = e.ReferenceInformationType;
              if ("NoMappingInformation" === t)
                return {
                  dataSize: 1,
                  buffer: [0],
                  indices: [0],
                  mappingType: "AllSame",
                  referenceType: r
                };
              for (var i = e.Materials.a, n = [], s = 0; s < i.length; ++s)
                n.push(s);
              return {
                dataSize: 1,
                buffer: i,
                indices: n,
                mappingType: t,
                referenceType: r
              };
            },
            parseNurbsGeometry: function(e) {
              if (void 0 === THREE.NURBSCurve)
                return (
                  console.error(
                    "THREE.FBXLoader: The loader relies on THREE.NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."
                  ),
                  new THREE.BufferGeometry()
                );
              var t = parseInt(e.Order);
              if (isNaN(t))
                return (
                  console.error(
                    "THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",
                    e.Order,
                    e.id
                  ),
                  new THREE.BufferGeometry()
                );
              for (
                var r,
                  i,
                  n = t - 1,
                  s = e.KnotVector.a,
                  a = [],
                  o = e.Points.a,
                  h = 0,
                  l = o.length;
                h < l;
                h += 4
              )
                a.push(new THREE.Vector4().fromArray(o, h));
              if ("Closed" === e.Form) a.push(a[0]);
              else if ("Periodic" === e.Form) {
                (r = n), (i = s.length - 1 - r);
                for (h = 0; h < n; ++h) a.push(a[h]);
              }
              var c = new THREE.NURBSCurve(n, s, a, r, i).getPoints(
                  7 * a.length
                ),
                u = new Float32Array(3 * c.length);
              c.forEach(function(e, t) {
                e.toArray(u, 3 * t);
              });
              var p = new THREE.BufferGeometry();
              return (
                p.addAttribute("position", new THREE.BufferAttribute(u, 3)), p
              );
            }
          }),
          (a.prototype = {
            constructor: a,
            parse: function() {
              var e = [],
                t = this.parseClips();
              if (void 0 === t) return e;
              for (var r in t) {
                var i = t[r],
                  n = this.addClip(i);
                e.push(n);
              }
              return e;
            },
            parseClips: function() {
              if (void 0 !== e.Objects.AnimationCurve) {
                var t = this.parseAnimationCurveNodes();
                this.parseAnimationCurves(t);
                var r = this.parseAnimationLayers(t);
                return this.parseAnimStacks(r);
              }
            },
            parseAnimationCurveNodes: function() {
              var t = e.Objects.AnimationCurveNode,
                r = new Map();
              for (var i in t) {
                var n = t[i];
                if (null !== n.attrName.match(/S|R|T|DeformPercent/)) {
                  var s = { id: n.id, attr: n.attrName, curves: {} };
                  r.set(s.id, s);
                }
              }
              return r;
            },
            parseAnimationCurves: function(r) {
              var i = e.Objects.AnimationCurve;
              for (var n in i) {
                var s = {
                    id: i[n].id,
                    times: i[n].KeyTime.a.map(p),
                    values: i[n].KeyValueFloat.a
                  },
                  a = t.get(s.id);
                if (void 0 !== a) {
                  var o = a.parents[0].ID,
                    h = a.parents[0].relationship;
                  h.match(/X/)
                    ? (r.get(o).curves.x = s)
                    : h.match(/Y/)
                    ? (r.get(o).curves.y = s)
                    : h.match(/Z/)
                    ? (r.get(o).curves.z = s)
                    : h.match(/d|DeformPercent/) &&
                      r.has(o) &&
                      (r.get(o).curves.morph = s);
                }
              }
            },
            parseAnimationLayers: function(r) {
              var i = e.Objects.AnimationLayer,
                n = new Map();
              for (var s in i) {
                var a = [],
                  o = t.get(parseInt(s));
                if (void 0 !== o) {
                  var h = this;
                  o.children.forEach(function(i, n) {
                    if (r.has(i.ID)) {
                      var s = r.get(i.ID);
                      if (
                        void 0 !== s.curves.x ||
                        void 0 !== s.curves.y ||
                        void 0 !== s.curves.z
                      ) {
                        if (void 0 === a[n]) {
                          t.get(i.ID).parents.forEach(function(e) {
                            void 0 !== e.relationship && (d = e.ID);
                          });
                          var o = e.Objects.Model[d.toString()],
                            l = {
                              modelName: THREE.PropertyBinding.sanitizeNodeName(
                                o.attrName
                              ),
                              initialPosition: [0, 0, 0],
                              initialRotation: [0, 0, 0],
                              initialScale: [1, 1, 1],
                              transform: h.getModelAnimTransform(o)
                            };
                          "PreRotation" in o &&
                            (l.preRotations = o.PreRotation.value),
                            "PostRotation" in o &&
                              (l.postRotations = o.PostRotation.value),
                            (a[n] = l);
                        }
                        a[n][s.attr] = s;
                      } else if (void 0 !== s.curves.morph) {
                        if (void 0 === a[n]) {
                          var c;
                          t.get(i.ID).parents.forEach(function(e) {
                            void 0 !== e.relationship && (c = e.ID);
                          });
                          var u = t.get(c).parents[0].ID,
                            p = t.get(u).parents[0].ID,
                            d = t.get(p).parents[0].ID;
                          (o = e.Objects.Model[d]),
                            (l = {
                              modelName: THREE.PropertyBinding.sanitizeNodeName(
                                o.attrName
                              ),
                              morphName: e.Objects.Deformer[c].attrName
                            });
                          a[n] = l;
                        }
                        a[n][s.attr] = s;
                      }
                    }
                  }),
                    n.set(parseInt(s), a);
                }
              }
              return n;
            },
            getModelAnimTransform: function(e) {
              var t = {};
              return (
                "RotationOrder" in e &&
                  (t.eulerOrder = parseInt(e.RotationOrder.value)),
                "Lcl_Translation" in e &&
                  (t.translation = e.Lcl_Translation.value),
                "RotationOffset" in e &&
                  (t.rotationOffset = e.RotationOffset.value),
                "Lcl_Rotation" in e && (t.rotation = e.Lcl_Rotation.value),
                "PreRotation" in e && (t.preRotation = e.PreRotation.value),
                "PostRotation" in e && (t.postRotation = e.PostRotation.value),
                "Lcl_Scaling" in e && (t.scale = e.Lcl_Scaling.value),
                w(t)
              );
            },
            parseAnimStacks: function(r) {
              var i = e.Objects.AnimationStack,
                n = {};
              for (var s in i) {
                var a = t.get(parseInt(s)).children;
                a.length > 1 &&
                  console.warn(
                    "THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers."
                  );
                var o = r.get(a[0].ID);
                n[s] = { name: i[s].attrName, layer: o };
              }
              return n;
            },
            addClip: function(e) {
              var t = [],
                r = this;
              return (
                e.layer.forEach(function(e) {
                  t = t.concat(r.generateTracks(e));
                }),
                new THREE.AnimationClip(e.name, -1, t)
              );
            },
            generateTracks: function(e) {
              var t = [],
                r = new THREE.Vector3(),
                i = new THREE.Quaternion(),
                n = new THREE.Vector3();
              if (
                (e.transform && e.transform.decompose(r, i, n),
                (r = r.toArray()),
                (i = new THREE.Euler().setFromQuaternion(i).toArray()),
                (n = n.toArray()),
                void 0 !== e.T && Object.keys(e.T.curves).length > 0)
              ) {
                var s = this.generateVectorTrack(
                  e.modelName,
                  e.T.curves,
                  r,
                  "position"
                );
                void 0 !== s && t.push(s);
              }
              if (void 0 !== e.R && Object.keys(e.R.curves).length > 0) {
                var a = this.generateRotationTrack(
                  e.modelName,
                  e.R.curves,
                  i,
                  e.preRotations,
                  e.postRotations
                );
                void 0 !== a && t.push(a);
              }
              if (void 0 !== e.S && Object.keys(e.S.curves).length > 0) {
                var o = this.generateVectorTrack(
                  e.modelName,
                  e.S.curves,
                  n,
                  "scale"
                );
                void 0 !== o && t.push(o);
              }
              if (void 0 !== e.DeformPercent) {
                var h = this.generateMorphTrack(e);
                void 0 !== h && t.push(h);
              }
              return t;
            },
            generateVectorTrack: function(e, t, r, i) {
              var n = this.getTimesForAllAxes(t),
                s = this.getKeyframeTrackValues(n, t, r);
              return new THREE.VectorKeyframeTrack(e + "." + i, n, s);
            },
            generateRotationTrack: function(e, t, r, i, n) {
              void 0 !== t.x &&
                (this.interpolateRotations(t.x),
                (t.x.values = t.x.values.map(THREE.Math.degToRad))),
                void 0 !== t.y &&
                  (this.interpolateRotations(t.y),
                  (t.y.values = t.y.values.map(THREE.Math.degToRad))),
                void 0 !== t.z &&
                  (this.interpolateRotations(t.z),
                  (t.z.values = t.z.values.map(THREE.Math.degToRad)));
              var s = this.getTimesForAllAxes(t),
                a = this.getKeyframeTrackValues(s, t, r);
              void 0 !== i &&
                ((i = i.map(THREE.Math.degToRad)).push("ZYX"),
                (i = new THREE.Euler().fromArray(i)),
                (i = new THREE.Quaternion().setFromEuler(i))),
                void 0 !== n &&
                  ((n = n.map(THREE.Math.degToRad)).push("ZYX"),
                  (n = new THREE.Euler().fromArray(n)),
                  (n = new THREE.Quaternion().setFromEuler(n).inverse()));
              for (
                var o = new THREE.Quaternion(),
                  h = new THREE.Euler(),
                  l = [],
                  c = 0;
                c < a.length;
                c += 3
              )
                h.set(a[c], a[c + 1], a[c + 2], "ZYX"),
                  o.setFromEuler(h),
                  void 0 !== i && o.premultiply(i),
                  void 0 !== n && o.multiply(n),
                  o.toArray(l, (c / 3) * 4);
              return new THREE.QuaternionKeyframeTrack(e + ".quaternion", s, l);
            },
            generateMorphTrack: function(e) {
              var t = e.DeformPercent.curves.morph,
                i = t.values.map(function(e) {
                  return e / 100;
                }),
                n = r.getObjectByName(e.modelName).morphTargetDictionary[
                  e.morphName
                ];
              return new THREE.NumberKeyframeTrack(
                e.modelName + ".morphTargetInfluences[" + n + "]",
                t.times,
                i
              );
            },
            getTimesForAllAxes: function(e) {
              var t = [];
              return (
                void 0 !== e.x && (t = t.concat(e.x.times)),
                void 0 !== e.y && (t = t.concat(e.y.times)),
                void 0 !== e.z && (t = t.concat(e.z.times)),
                (t = t
                  .sort(function(e, t) {
                    return e - t;
                  })
                  .filter(function(e, t, r) {
                    return r.indexOf(e) == t;
                  }))
              );
            },
            getKeyframeTrackValues: function(e, t, r) {
              var i = r,
                n = [],
                s = -1,
                a = -1,
                o = -1;
              return (
                e.forEach(function(e) {
                  if (
                    (t.x && (s = t.x.times.indexOf(e)),
                    t.y && (a = t.y.times.indexOf(e)),
                    t.z && (o = t.z.times.indexOf(e)),
                    -1 !== s)
                  ) {
                    var r = t.x.values[s];
                    n.push(r), (i[0] = r);
                  } else n.push(i[0]);
                  if (-1 !== a) {
                    var h = t.y.values[a];
                    n.push(h), (i[1] = h);
                  } else n.push(i[1]);
                  if (-1 !== o) {
                    var l = t.z.values[o];
                    n.push(l), (i[2] = l);
                  } else n.push(i[2]);
                }),
                n
              );
            },
            interpolateRotations: function(e) {
              for (var t = 1; t < e.values.length; t++) {
                var r = e.values[t - 1],
                  i = e.values[t] - r,
                  n = Math.abs(i);
                if (n >= 180) {
                  for (
                    var s = n / 180,
                      a = i / s,
                      o = r + a,
                      h = e.times[t - 1],
                      l = (e.times[t] - h) / s,
                      c = h + l,
                      u = [],
                      p = [];
                    c < e.times[t];

                  )
                    u.push(c), (c += l), p.push(o), (o += a);
                  (e.times = I(e.times, t, u)), (e.values = I(e.values, t, p));
                }
              }
            }
          }),
          (o.prototype = {
            constructor: o,
            getPrevNode: function() {
              return this.nodeStack[this.currentIndent - 2];
            },
            getCurrentNode: function() {
              return this.nodeStack[this.currentIndent - 1];
            },
            getCurrentProp: function() {
              return this.currentProp;
            },
            pushStack: function(e) {
              this.nodeStack.push(e), (this.currentIndent += 1);
            },
            popStack: function() {
              this.nodeStack.pop(), (this.currentIndent -= 1);
            },
            setCurrentProp: function(e, t) {
              (this.currentProp = e), (this.currentPropName = t);
            },
            parse: function(e) {
              (this.currentIndent = 0),
                (this.allNodes = new c()),
                (this.nodeStack = []),
                (this.currentProp = []),
                (this.currentPropName = "");
              var t = this,
                r = e.split(/[\r\n]+/);
              return (
                r.forEach(function(e, i) {
                  var n = e.match(/^[\s\t]*;/),
                    s = e.match(/^[\s\t]*$/);
                  if (!n && !s) {
                    var a = e.match(
                        "^\\t{" + t.currentIndent + "}(\\w+):(.*){",
                        ""
                      ),
                      o = e.match(
                        "^\\t{" + t.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"
                      ),
                      h = e.match("^\\t{" + (t.currentIndent - 1) + "}}");
                    a
                      ? t.parseNodeBegin(e, a)
                      : o
                      ? t.parseNodeProperty(e, o, r[++i])
                      : h
                      ? t.popStack()
                      : e.match(/^[^\s\t}]/) && t.parseNodePropertyContinued(e);
                  }
                }),
                this.allNodes
              );
            },
            parseNodeBegin: function(e, t) {
              var r = t[1]
                  .trim()
                  .replace(/^"/, "")
                  .replace(/"$/, ""),
                i = t[2].split(",").map(function(e) {
                  return e
                    .trim()
                    .replace(/^"/, "")
                    .replace(/"$/, "");
                }),
                n = { name: r },
                s = this.parseNodeAttr(i),
                a = this.getCurrentNode();
              0 === this.currentIndent
                ? this.allNodes.add(r, n)
                : r in a
                ? ("PoseNode" === r
                    ? a.PoseNode.push(n)
                    : void 0 !== a[r].id &&
                      ((a[r] = {}), (a[r][a[r].id] = a[r])),
                  "" !== s.id && (a[r][s.id] = n))
                : "number" == typeof s.id
                ? ((a[r] = {}), (a[r][s.id] = n))
                : "Properties70" !== r && (a[r] = "PoseNode" === r ? [n] : n),
                "number" == typeof s.id && (n.id = s.id),
                "" !== s.name && (n.attrName = s.name),
                "" !== s.type && (n.attrType = s.type),
                this.pushStack(n);
            },
            parseNodeAttr: function(e) {
              var t = e[0];
              "" !== e[0] && ((t = parseInt(e[0])), isNaN(t) && (t = e[0]));
              var r = "",
                i = "";
              return (
                e.length > 1 &&
                  ((r = e[1].replace(/^(\w+)::/, "")), (i = e[2])),
                { id: t, name: r, type: i }
              );
            },
            parseNodeProperty: function(e, t, r) {
              var i = t[1]
                  .replace(/^"/, "")
                  .replace(/"$/, "")
                  .trim(),
                n = t[2]
                  .replace(/^"/, "")
                  .replace(/"$/, "")
                  .trim();
              "Content" === i &&
                "," === n &&
                (n = r
                  .replace(/"/g, "")
                  .replace(/,$/, "")
                  .trim());
              var s = this.getCurrentNode();
              if ("Properties70" !== s.name) {
                if ("C" === i) {
                  var a = n.split(",").slice(1),
                    o = parseInt(a[0]),
                    h = parseInt(a[1]),
                    l = n.split(",").slice(3);
                  (i = "connections"),
                    (function(e, t) {
                      for (
                        var r = 0, i = e.length, n = t.length;
                        r < n;
                        r++, i++
                      )
                        e[i] = t[r];
                    })(
                      (n = [o, h]),
                      (l = l.map(function(e) {
                        return e.trim().replace(/^"/, "");
                      }))
                    ),
                    void 0 === s[i] && (s[i] = []);
                }
                "Node" === i && (s.id = n),
                  i in s && Array.isArray(s[i])
                    ? s[i].push(n)
                    : "a" !== i
                    ? (s[i] = n)
                    : (s.a = n),
                  this.setCurrentProp(s, i),
                  "a" === i && "," !== n.slice(-1) && (s.a = b(n));
              } else this.parseNodeSpecialProperty(e, i, n);
            },
            parseNodePropertyContinued: function(e) {
              var t = this.getCurrentNode();
              (t.a += e), "," !== e.slice(-1) && (t.a = b(t.a));
            },
            parseNodeSpecialProperty: function(e, t, r) {
              var i = r.split('",').map(function(e) {
                  return e
                    .trim()
                    .replace(/^\"/, "")
                    .replace(/\s/, "_");
                }),
                n = i[0],
                s = i[1],
                a = i[2],
                o = i[3],
                h = i[4];
              switch (s) {
                case "int":
                case "enum":
                case "bool":
                case "ULongLong":
                case "double":
                case "Number":
                case "FieldOfView":
                  h = parseFloat(h);
                  break;
                case "Color":
                case "ColorRGB":
                case "Vector3D":
                case "Lcl_Translation":
                case "Lcl_Rotation":
                case "Lcl_Scaling":
                  h = b(h);
              }
              (this.getPrevNode()[n] = {
                type: s,
                type2: a,
                flag: o,
                value: h
              }),
                this.setCurrentProp(this.getPrevNode(), n);
            }
          }),
          (h.prototype = {
            constructor: h,
            parse: function(e) {
              var t = new l(e);
              t.skip(23);
              for (
                var r = t.getUint32(), i = new c();
                !this.endOfContent(t);

              ) {
                var n = this.parseNode(t, r);
                null !== n && i.add(n.name, n);
              }
              return i;
            },
            endOfContent: function(e) {
              return e.size() % 16 == 0
                ? ((e.getOffset() + 160 + 16) & -16) >= e.size()
                : e.getOffset() + 160 + 16 >= e.size();
            },
            parseNode: function(e, t) {
              var r = {},
                i = t >= 7500 ? e.getUint64() : e.getUint32(),
                n = t >= 7500 ? e.getUint64() : e.getUint32(),
                s = (t >= 7500 ? e.getUint64() : e.getUint32(), e.getUint8()),
                a = e.getString(s);
              if (0 === i) return null;
              for (var o = [], h = 0; h < n; h++) o.push(this.parseProperty(e));
              var l = o.length > 0 ? o[0] : "",
                c = o.length > 1 ? o[1] : "",
                u = o.length > 2 ? o[2] : "";
              for (
                r.singleProperty = 1 === n && e.getOffset() === i;
                i > e.getOffset();

              ) {
                var p = this.parseNode(e, t);
                null !== p && this.parseSubNode(a, r, p);
              }
              return (
                (r.propertyList = o),
                "number" == typeof l && (r.id = l),
                "" !== c && (r.attrName = c),
                "" !== u && (r.attrType = u),
                "" !== a && (r.name = a),
                r
              );
            },
            parseSubNode: function(e, t, r) {
              if (!0 === r.singleProperty) {
                var i = r.propertyList[0];
                Array.isArray(i)
                  ? ((t[r.name] = r), (r.a = i))
                  : (t[r.name] = i);
              } else if ("Connections" === e && "C" === r.name) {
                var n = [];
                r.propertyList.forEach(function(e, t) {
                  0 !== t && n.push(e);
                }),
                  void 0 === t.connections && (t.connections = []),
                  t.connections.push(n);
              } else if ("Properties70" === r.name) {
                Object.keys(r).forEach(function(e) {
                  t[e] = r[e];
                });
              } else if ("Properties70" === e && "P" === r.name) {
                var s,
                  a = r.propertyList[0],
                  o = r.propertyList[1],
                  h = r.propertyList[2],
                  l = r.propertyList[3];
                0 === a.indexOf("Lcl ") && (a = a.replace("Lcl ", "Lcl_")),
                  0 === o.indexOf("Lcl ") && (o = o.replace("Lcl ", "Lcl_")),
                  (s =
                    "Color" === o ||
                    "ColorRGB" === o ||
                    "Vector" === o ||
                    "Vector3D" === o ||
                    0 === o.indexOf("Lcl_")
                      ? [
                          r.propertyList[4],
                          r.propertyList[5],
                          r.propertyList[6]
                        ]
                      : r.propertyList[4]),
                  (t[a] = { type: o, type2: h, flag: l, value: s });
              } else
                void 0 === t[r.name]
                  ? "number" == typeof r.id
                    ? ((t[r.name] = {}), (t[r.name][r.id] = r))
                    : (t[r.name] = r)
                  : "PoseNode" === r.name
                  ? (Array.isArray(t[r.name]) || (t[r.name] = [t[r.name]]),
                    t[r.name].push(r))
                  : void 0 === t[r.name][r.id] && (t[r.name][r.id] = r);
            },
            parseProperty: function(e) {
              var t = e.getString(1);
              switch (t) {
                case "C":
                  return e.getBoolean();
                case "D":
                  return e.getFloat64();
                case "F":
                  return e.getFloat32();
                case "I":
                  return e.getInt32();
                case "L":
                  return e.getInt64();
                case "R":
                  var r = e.getUint32();
                  return e.getArrayBuffer(r);
                case "S":
                  r = e.getUint32();
                  return e.getString(r);
                case "Y":
                  return e.getInt16();
                case "b":
                case "c":
                case "d":
                case "f":
                case "i":
                case "l":
                  var i = e.getUint32(),
                    n = e.getUint32(),
                    s = e.getUint32();
                  if (0 === n)
                    switch (t) {
                      case "b":
                      case "c":
                        return e.getBooleanArray(i);
                      case "d":
                        return e.getFloat64Array(i);
                      case "f":
                        return e.getFloat32Array(i);
                      case "i":
                        return e.getInt32Array(i);
                      case "l":
                        return e.getInt64Array(i);
                    }
                  "undefined" == typeof Zlib &&
                    console.error(
                      "THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js"
                    );
                  var a = new l(
                    new Zlib.Inflate(
                      new Uint8Array(e.getArrayBuffer(s))
                    ).decompress().buffer
                  );
                  switch (t) {
                    case "b":
                    case "c":
                      return a.getBooleanArray(i);
                    case "d":
                      return a.getFloat64Array(i);
                    case "f":
                      return a.getFloat32Array(i);
                    case "i":
                      return a.getInt32Array(i);
                    case "l":
                      return a.getInt64Array(i);
                  }
                default:
                  throw new Error(
                    "THREE.FBXLoader: Unknown property type " + t
                  );
              }
            }
          }),
          (l.prototype = {
            constructor: l,
            getOffset: function() {
              return this.offset;
            },
            size: function() {
              return this.dv.buffer.byteLength;
            },
            skip: function(e) {
              this.offset += e;
            },
            getBoolean: function() {
              return 1 == (1 & this.getUint8());
            },
            getBooleanArray: function(e) {
              for (var t = [], r = 0; r < e; r++) t.push(this.getBoolean());
              return t;
            },
            getUint8: function() {
              var e = this.dv.getUint8(this.offset);
              return (this.offset += 1), e;
            },
            getInt16: function() {
              var e = this.dv.getInt16(this.offset, this.littleEndian);
              return (this.offset += 2), e;
            },
            getInt32: function() {
              var e = this.dv.getInt32(this.offset, this.littleEndian);
              return (this.offset += 4), e;
            },
            getInt32Array: function(e) {
              for (var t = [], r = 0; r < e; r++) t.push(this.getInt32());
              return t;
            },
            getUint32: function() {
              var e = this.dv.getUint32(this.offset, this.littleEndian);
              return (this.offset += 4), e;
            },
            getInt64: function() {
              var e, t;
              return (
                this.littleEndian
                  ? ((e = this.getUint32()), (t = this.getUint32()))
                  : ((t = this.getUint32()), (e = this.getUint32())),
                2147483648 & t
                  ? ((t = 4294967295 & ~t),
                    4294967295 === (e = 4294967295 & ~e) &&
                      (t = (t + 1) & 4294967295),
                    -(4294967296 * t + (e = (e + 1) & 4294967295)))
                  : 4294967296 * t + e
              );
            },
            getInt64Array: function(e) {
              for (var t = [], r = 0; r < e; r++) t.push(this.getInt64());
              return t;
            },
            getUint64: function() {
              var e, t;
              return (
                this.littleEndian
                  ? ((e = this.getUint32()), (t = this.getUint32()))
                  : ((t = this.getUint32()), (e = this.getUint32())),
                4294967296 * t + e
              );
            },
            getFloat32: function() {
              var e = this.dv.getFloat32(this.offset, this.littleEndian);
              return (this.offset += 4), e;
            },
            getFloat32Array: function(e) {
              for (var t = [], r = 0; r < e; r++) t.push(this.getFloat32());
              return t;
            },
            getFloat64: function() {
              var e = this.dv.getFloat64(this.offset, this.littleEndian);
              return (this.offset += 8), e;
            },
            getFloat64Array: function(e) {
              for (var t = [], r = 0; r < e; r++) t.push(this.getFloat64());
              return t;
            },
            getArrayBuffer: function(e) {
              var t = this.dv.buffer.slice(this.offset, this.offset + e);
              return (this.offset += e), t;
            },
            getString: function(e) {
              for (var t = [], r = 0; r < e; r++) t[r] = this.getUint8();
              var i = t.indexOf(0);
              return (
                i >= 0 && (t = t.slice(0, i)),
                THREE.LoaderUtils.decodeText(new Uint8Array(t))
              );
            }
          }),
          (c.prototype = {
            constructor: c,
            add: function(e, t) {
              this[e] = t;
            }
          });
        var d = [];
        function g(e, t, r, i) {
          var n;
          switch (i.mappingType) {
            case "ByPolygonVertex":
              n = e;
              break;
            case "ByPolygon":
              n = t;
              break;
            case "ByVertice":
              n = r;
              break;
            case "AllSame":
              n = i.indices[0];
              break;
            default:
              console.warn(
                "THREE.FBXLoader: unknown attribute mapping type " +
                  i.mappingType
              );
          }
          "IndexToDirect" === i.referenceType && (n = i.indices[n]);
          var s = n * i.dataSize,
            a = s + i.dataSize;
          return (function(e, t, r, i) {
            for (var n = r, s = 0; n < i; n++, s++) e[s] = t[n];
            return e;
          })(d, i.buffer, s, a);
        }
        var m = new THREE.Matrix4(),
          f = new THREE.Euler(),
          v = new THREE.Vector3(),
          y = new THREE.Vector3(),
          E = new THREE.Matrix4();
        function w(e) {
          var t = new THREE.Matrix4();
          y.set(0, 0, 0), E.identity();
          var r,
            i = e.eulerOrder ? x(e.eulerOrder) : x(0);
          (e.translation && y.fromArray(e.translation),
          e.rotationOffset && y.add(v.fromArray(e.rotationOffset)),
          e.rotation) &&
            ((r = e.rotation.map(THREE.Math.degToRad)).push(i),
            E.makeRotationFromEuler(f.fromArray(r)));
          e.preRotation &&
            ((r = e.preRotation.map(THREE.Math.degToRad)).push(i),
            m.makeRotationFromEuler(f.fromArray(r)),
            E.premultiply(m));
          e.postRotation &&
            ((r = e.postRotation.map(THREE.Math.degToRad)).push(i),
            m.makeRotationFromEuler(f.fromArray(r)),
            m.getInverse(m),
            E.multiply(m));
          return (
            e.scale && t.scale(v.fromArray(e.scale)),
            t.setPosition(y),
            t.multiply(E),
            t
          );
        }
        function x(e) {
          var t = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"];
          return 6 === e
            ? (console.warn(
                "THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."
              ),
              t[0])
            : t[e];
        }
        function b(e) {
          return e.split(",").map(function(e) {
            return parseFloat(e);
          });
        }
        function T(e, t, r) {
          return (
            void 0 === t && (t = 0),
            void 0 === r && (r = e.byteLength),
            THREE.LoaderUtils.decodeText(new Uint8Array(e, t, r))
          );
        }
        function I(e, t, r) {
          return e
            .slice(0, t)
            .concat(r)
            .concat(e.slice(t));
        }
        return i;
      })()),
      AFRAME.registerComponent("fbx-model", {
        schema: { src: { type: "asset" }, crossorigin: { default: "" } },
        init: function() {
          this.model = null;
        },
        update: function() {
          const e = this.data;
          if (!e.src) return;
          this.remove();
          const t = new THREE.FBXLoader();
          e.crossorigin && t.setCrossOrigin(e.crossorigin),
            t.load(e.src, this.load.bind(this));
        },
        load: function(e) {
          (this.model = e),
            this.el.setObject3D("mesh", e),
            this.el.emit("model-loaded", { format: "fbx", model: e });
        },
        remove: function() {
          this.model && this.el.removeObject3D("mesh");
        }
      });
  },
  345: function(e, t, r) {
    "use strict";
    r.r(t);
    r(169);
    class i {
      constructor(e) {
        (this.context = e),
          (this.shapes = [
            "circle",
            "square",
            "triangle",
            "pentagon",
            "hexagon",
            "octagon",
            "nonagon",
            "decagon",
            "dodecagon",
            "star"
          ]);
      }
      setOptions(e, t, r) {
        (this.size = e), (this.color = t), (this.opacity = r);
      }
      setColor() {}
      getSize() {
        return "random" === this.size ? 30 * Math.random() : this.size;
      }
      getShape() {
        return "random" === this.shape
          ? this.shapes[Math.round(Math.random() * (this.shapes.length - 1))]
          : this.shape;
      }
      _draw() {
        this.setColor(),
          (this.context.globalAlpha =
            "random" === this.opacity ? Math.random() : this.opacity);
      }
      _finishDraw() {
        (this.context.globalAlpha = 1),
          localStorage.setItem(
            "currentImage",
            document.getElementById("paintCanvas").toDataURL("image/jpg")
          );
      }
      pointOnCircle(e, t) {
        return new THREE.Vector2(
          Math.cos(THREE.Math.degToRad(e)) * t,
          Math.sin(THREE.Math.degToRad(e)) * t
        );
      }
      distanceBetween(e, t) {
        return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
      }
      angleBetween(e, t) {
        return Math.atan2(t.x - e.x, t.y - e.y);
      }
      midPointBtw(e, t) {
        return { x: e.x + (t.x - e.x) / 2, y: e.y + (t.y - e.y) / 2 };
      }
      getRandomInt(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e;
      }
      stop() {
        delete this.lastPosition;
      }
    }
    class n extends i {
      setColor() {
        this.context.strokeStyle =
          "random" === this.color ? randomColor() : this.color;
      }
      draw(e) {
        if ((this._draw(), this.lastPosition)) {
          let t = this.lastPosition,
            r = e;
          this.distanceBetween(t, r) < 150 &&
            ((this.context.lineWidth = this.getSize() / 4),
            this.context.beginPath(),
            this.context.moveTo(t.x, t.y),
            this.context.lineTo(r.x, r.y),
            this.context.stroke());
        }
        (this.lastPosition = e), this._finishDraw();
      }
    }
    class s {
      constructor() {
        (this.buffer = document.createElement("canvas")),
          (this.tintBuffer = document.createElement("canvas"));
      }
      hexToRgb(e) {
        let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t
          ? {
              r: parseInt(t[1], 16),
              g: parseInt(t[2], 16),
              b: parseInt(t[3], 16)
            }
          : null;
      }
      tintImage(e, t) {
        (this.buffer.width = e.width), (this.buffer.height = e.height);
        let r = this.buffer.getContext("2d");
        return (
          r.clearRect(0, 0, this.buffer.width, this.buffer.height),
          r.drawImage(e, 0, 0),
          (r.globalCompositeOperation = "source-in"),
          (r.fillStyle = t),
          r.rect(0, 0, this.buffer.width, this.buffer.height),
          r.fill(),
          this.buffer
        );
      }
    }
    AFRAME.registerComponent("avatar-editor", {
      schema: { cameraEl: { type: "selector" } },
      init() {
        this.resolution = 512;
        let e = document.getElementById("paintCanvas");
        (this.historyCanvas = document.createElement("canvas")),
          (this.historyCanvasContext = this.historyCanvas.getContext("2d")),
          (this.historyCanvas.width = this.historyCanvas.height = this.resolution),
          (this.context = e.getContext("2d")),
          (this.context.lineJoin = this.context.lineCap = "round"),
          (this.canvasTexture = new THREE.Texture(e)),
          (this.original_image = new Image()),
          (this.original_image.crossOrigin = "Anonymous"),
          (this.raycaster = new THREE.Raycaster()),
          (this.mouse = new THREE.Vector2()),
          (this.renderOutput = document.getElementById("renderOutput")),
          (this.baseMesh = "Male"),
          (this.baseTexture = "Astro Naut"),
          (this.avatarMeshes = ["Female", "Male"]),
          (this.avatarTextures = [
            "Archer Girl",
            "Astro Naut",
            "Captain Spacey",
            "Chef Superb",
            "Chip Woodley",
            "Clive Cop",
            "Convict",
            "Doc",
            "Elf",
            "Franky Fire",
            "Girle Girl",
            "Knight Kato",
            "Morty the Mummy",
            "Ninja Go Camo",
            "Ninja Go Ninja",
            "Pirate Pilt",
            "Pumpy",
            "Robert Roboto",
            "Rumbo",
            "Santa Claus",
            "Skelly",
            "Swampy the Eye",
            "Teachy Tess",
            "Undead Yeti",
            "UVmap",
            "Zombie Braains"
          ]),
          (this.enableDrawing = !1),
          (this.brushes = {
            pencil: new n(this.context),
            pen: new (class extends i {
              constructor(e) {
                super(e),
                  (this.img = new Image()),
                  (this.img.crossOrigin = "Anonymous"),
                  (this.img.src =
                    "https://cdn.theexpanse.app/brushes/brush2.png"),
                  (this.tint = new s());
              }
              setOptions(e, t, r) {
                (this.size = e),
                  (this.color = t),
                  (this.opacity = r),
                  (this._img = new Image()),
                  (this._img.crossOrigin = "Anonymous"),
                  (this._img.onload = () => {
                    this.img = this.tint.tintImage(this._img, this.color);
                  }),
                  (this._img.src =
                    "https://cdn.theexpanse.app/brushes/brush2.png");
              }
              draw(e) {
                if (this.lastPosition) {
                  "random" === this.color &&
                    (this.img = this.tint.tintImage(this._img, randomColor()));
                  let t = this.distanceBetween(this.lastPosition, e),
                    r = this.angleBetween(this.lastPosition, e);
                  if (t < 150)
                    for (let e = 0; e < t; e++) {
                      let t =
                          this.lastPosition.x +
                          Math.sin(r) * e -
                          this.getSize() / 2,
                        i =
                          this.lastPosition.y +
                          Math.cos(r) * e -
                          this.getSize() / 2;
                      this.context.save(),
                        this._draw(),
                        this.context.translate(t, i),
                        this.context.scale(this.size / 40, this.size / 40),
                        this.context.drawImage(this.img, 0, 0),
                        this._finishDraw(),
                        this.context.restore();
                    }
                }
                this.lastPosition = e;
              }
            })(this.context),
            "paint-brush": new (class extends i {
              constructor(e) {
                super(e), (this.tint = new s());
              }
              draw(e) {
                if ((this._draw(), this.lastPosition)) {
                  let t = this.distanceBetween(this.lastPosition, e),
                    r = this.angleBetween(this.lastPosition, e);
                  if (t < 150)
                    for (let e = 0; e < t; e += 5) {
                      let t = this.lastPosition.x + Math.sin(r) * e,
                        i = this.lastPosition.y + Math.cos(r) * e,
                        n = this.context.createRadialGradient(
                          t,
                          i,
                          this.getSize() / 4,
                          t,
                          i,
                          this.getSize() / 2
                        );
                      n.addColorStop(
                        0,
                        "random" === this.color ? randomColor() : this.color
                      );
                      let s = this.tint.hexToRgb(
                        "random" === this.color ? randomColor() : this.color
                      );
                      n.addColorStop(
                        0.5,
                        "rgba(" + s.r + "," + s.g + "," + s.b + ",0.5)"
                      ),
                        n.addColorStop(
                          1,
                          "rgba(" + s.r + "," + s.g + "," + s.b + ",0)"
                        ),
                        (this.context.fillStyle = n),
                        this.context.fillRect(
                          t - this.getSize() / 2,
                          i - this.getSize() / 2,
                          this.getSize(),
                          this.getSize()
                        );
                    }
                }
                (this.lastPosition = e), this._finishDraw();
              }
            })(this.context),
            fur: new (class extends i {
              constructor(e) {
                super(e),
                  (this.img = new Image()),
                  (this.img.crossOrigin = "Anonymous"),
                  (this.img.src =
                    "https://cdn.theexpanse.app/brushes/brush2.png"),
                  (this.tint = new s());
              }
              setOptions(e, t, r) {
                (this.size = e),
                  (this.color = t),
                  (this.opacity = r),
                  (this._img = new Image()),
                  (this._img.crossOrigin = "Anonymous"),
                  (this._img.onload = () => {
                    this.img = this.tint.tintImage(this._img, this.color);
                  }),
                  (this._img.src =
                    "https://cdn.theexpanse.app/brushes/brush2.png");
              }
              draw(e) {
                if ((this._draw(), this.lastPosition)) {
                  "random" === this.color &&
                    (this.img = this.tint.tintImage(this._img, randomColor()));
                  let t = this.distanceBetween(this.lastPosition, e),
                    r = this.angleBetween(this.lastPosition, e);
                  if (t < 150)
                    for (let e = 0; e < t; e++) {
                      let t = this.lastPosition.x + Math.sin(r) * e,
                        i = this.lastPosition.y + Math.cos(r) * e;
                      this.context.save(),
                        this.context.translate(t, i),
                        this.context.scale(this.size / 40, this.size / 40),
                        this.context.rotate(
                          (180 * Math.PI) / this.getRandomInt(0, 180)
                        ),
                        this.context.drawImage(this.img, 0, 0),
                        this.context.restore();
                    }
                }
                (this.lastPosition = e), this._finishDraw();
              }
            })(this.context),
            stamp: new (class extends i {
              setOptions(e, t, r, i, n, s, a, o, h, l) {
                (this.size = e),
                  (this.color = t),
                  (this.opacity = r),
                  (this.shape = i),
                  (this.shapeFill = h),
                  (this.shapeStrokeWidth = l);
              }
              drawStar(e, t) {
                this.context.save(),
                  this.context.beginPath(),
                  this.context.translate(e.x, e.y),
                  this.context.rotate((Math.PI / 180) * t.angle),
                  this.context.scale(t.scale, t.scale),
                  this.shapeFill
                    ? (this.context.fillStyle = t.color)
                    : ((this.context.strokeStyle = t.color),
                      (this.context.lineWidth = this.shapeStrokeWidth / 20));
                for (let e = 5; e--; )
                  this.context.lineTo(0, 0.2),
                    this.context.translate(0, 0.2),
                    this.context.rotate((2 * Math.PI) / 10),
                    this.context.lineTo(0, -0.2),
                    this.context.translate(0, -0.2),
                    this.context.rotate((-6 * Math.PI) / 10);
                this.context.lineTo(0, 0.2),
                  this.context.closePath(),
                  this.fillOrStroke(),
                  this.context.restore();
              }
              drawPolyGon(e, t) {
                this.context.beginPath(),
                  this.shapeFill
                    ? (this.context.fillStyle =
                        "random" === this.color ? randomColor() : this.color)
                    : ((this.context.strokeStyle =
                        "random" === this.color ? randomColor() : this.color),
                      (this.context.lineWidth = this.shapeStrokeWidth));
                for (let r = 0; r < t; r++) {
                  let i = (r / t) * 360 + 90,
                    n = this.getSize() / 4,
                    s = this.pointOnCircle(i, n);
                  this.context[0 === r ? "moveTo" : "lineTo"](
                    e.x + s.x,
                    e.y + s.y
                  );
                }
                this.context.closePath(), this.fillOrStroke();
              }
              fillOrStroke() {
                this.shapeFill ? this.context.fill() : this.context.stroke();
              }
              draw(e) {
                if ((this._draw(), this.lastPosition)) {
                  let t = e.x,
                    r = e.y;
                  switch (this.getShape()) {
                    case "circle":
                      this.context.beginPath(),
                        this.shapeFill
                          ? (this.context.fillStyle =
                              "random" === this.color
                                ? randomColor()
                                : this.color)
                          : ((this.context.strokeStyle =
                              "random" === this.color
                                ? randomColor()
                                : this.color),
                            (this.context.lineWidth = this.shapeStrokeWidth)),
                        this.context.arc(
                          t,
                          r,
                          this.getSize() / 2,
                          !1,
                          2 * Math.PI,
                          !1
                        ),
                        this.fillOrStroke(),
                        this.context.closePath();
                      break;
                    case "square":
                      this.drawPolyGon(e, 4);
                      break;
                    case "triangle":
                      this.drawPolyGon(e, 3);
                      break;
                    case "pentagon":
                      this.drawPolyGon(e, 5);
                      break;
                    case "hexagon":
                      this.drawPolyGon(e, 6);
                      break;
                    case "octagon":
                      this.drawPolyGon(e, 8);
                      break;
                    case "nonagon":
                      this.drawPolyGon(e, 9);
                      break;
                    case "decagon":
                      this.drawPolyGon(e, 10);
                      break;
                    case "dodecagon":
                      this.drawPolyGon(e, 12);
                      break;
                    case "star":
                      this.drawStar(e, {
                        angle: 0,
                        width: 0.05,
                        scale: this.getSize(),
                        color:
                          "random" === this.color ? randomColor() : this.color,
                        opacity:
                          "random" === this.opacity
                            ? Math.random()
                            : this.opacity
                      });
                  }
                  this.stop();
                } else this.lastPosition = e;
                this._finishDraw();
              }
            })(this.context),
            pixels: new (class extends i {
              draw(e) {
                this._draw();
                let t = e.x,
                  r = e.y;
                for (let e = -10; e < 10; e += 4)
                  for (let i = -10; i < 10; i += 4)
                    Math.random() > 0.5 &&
                      ((this.context.fillStyle = randomColor()),
                      this.context.fillRect(t + e, r + i, 4, 4));
                this._finishDraw();
              }
            })(this.context),
            pattern: new (class extends n {
              constructor(e) {
                super(e),
                  (this.patternCanvas = document.createElement("canvas")),
                  (this.patternCtx = this.patternCanvas.getContext("2d")),
                  (this.img = new Image()),
                  (this.img.crossOrigin = "Anonymous"),
                  (this.tint = new s());
              }
              setOptions(e, t, r, i, n, s, a, o) {
                (this.size = e),
                  (this.color = t),
                  (this.opacity = r),
                  (this.pattern = n),
                  (this.gutter = o || 5),
                  (this.patternSize = a || 5),
                  (this.patternImage = s),
                  (this._img = new Image()),
                  (this._img.crossOrigin = "Anonymous"),
                  (this._img.onload = () => {
                    this.img = this.tint.tintImage(
                      this._img,
                      "random" === this.color ? randomColor() : this.color
                    );
                  }),
                  (this._img.src =
                    "https://cdn.theexpanse.app/brushes/brush2.png");
              }
              getPattern() {
                switch (this.pattern) {
                  case "pokadot":
                    (this.patternCanvas.width = this.patternCanvas.height =
                      this.patternSize + this.gutter),
                      (this.patternCtx.fillStyle =
                        "random" === this.color ? randomColor() : this.color),
                      this.patternCtx.beginPath(),
                      this.patternCtx.arc(
                        this.patternSize / 2,
                        this.patternSize / 2,
                        this.patternSize / 2,
                        0,
                        2 * Math.PI,
                        !1
                      ),
                      this.patternCtx.closePath(),
                      this.patternCtx.fill();
                    break;
                  case "stripes":
                    (this.patternCanvas.width = this.patternCanvas.height =
                      this.patternSize + this.gutter),
                      (this.patternCtx.fillStyle =
                        "random" === this.color ? randomColor() : this.color),
                      this.patternCtx.fillRect(
                        0,
                        0,
                        this.patternSize + this.gutter,
                        this.patternSize
                      );
                    break;
                  case "vertical-stripes":
                    (this.patternCanvas.width = this.patternCanvas.height =
                      this.patternSize + this.gutter),
                      (this.patternCtx.fillStyle =
                        "random" === this.color ? randomColor() : this.color),
                      this.patternCtx.fillRect(
                        0,
                        0,
                        this.patternSize,
                        this.patternSize + this.gutter
                      );
                    break;
                  case "image":
                    (this.patternCanvas.width = this.patternCanvas.height =
                      this.patternSize + this.gutter),
                      (this.img = this.tint.tintImage(
                        this._img,
                        "random" === this.color ? randomColor() : this.color
                      )),
                      this.patternCtx.drawImage(
                        this.img,
                        0,
                        0,
                        this.patternSize,
                        this.patternSize
                      );
                }
                return this.context.createPattern(this.patternCanvas, "repeat");
              }
              setColor() {
                this.context.strokeStyle = this.getPattern();
              }
            })(this.context),
            image: new (class extends i {
              draw(e) {
                this._draw();
                let t = new Image();
                (t.crossOrigin = "Anonymous"),
                  (t.onload = () => {
                    this.context.drawImage(
                      t,
                      0,
                      0,
                      t.width,
                      t.height,
                      e.x,
                      e.y,
                      this.width,
                      this.height
                    ),
                      this._finishDraw();
                  }),
                  (t.src = this.image);
              }
              setOptions(e, t, r, i, n, s, a, o) {
                (this.width = e), (this.height = a), (this.image = s);
              }
            })(this.context)
          }),
          this.setupEvents(),
          (this.currentOptions = {
            currentBrush: "pencil",
            size: 10,
            color: "#00ffff",
            opacity: 0.9,
            shape: "triangle",
            shapeFill: !1,
            shapeStrokeWidth: 0.2,
            pattern: "image",
            patternImage: "https://cdn.theexpanse.app/brushes/brush2.png",
            patternSize: 5,
            patternGutter: 5,
            randomColor: !1,
            randomSize: !1,
            randomOpacity: !1,
            randomShape: !1
          }),
          (this.original_image.onload = () => {
            this.context.drawImage(
              this.original_image,
              0,
              0,
              this.resolution,
              this.resolution
            ),
              this.historyCanvasContext.drawImage(
                this.original_image,
                0,
                0,
                this.resolution,
                this.resolution
              );
            let e = localStorage.getItem("currentImage");
            e && this.setImage(e);
          });
        let t = localStorage.getItem("baseMesh");
        t && (this.baseMesh = t),
          (this.original_image.src =
            "textures/" + this.baseTexture + " TEX.jpg"),
          this.el.setAttribute("fbx-model", { src: this.baseMesh + ".FBX" }),
          this.el.addEventListener("model-loaded", () => {
            this.el.object3D.traverse(e => {
              ("Male001" !== e.name && "female" !== e.name) ||
                (e.material.map = this.canvasTexture),
                "Root" === e.name && (this.baseMesh = e);
            });
          }),
          (this.history = []),
          (this.gui = new dat.GUI({ width: 224 })),
          (this.gui.closed = !0),
          (dat.GUI.prototype.showFolder = function(e, t) {
            let r = this.__folders[e];
            r &&
              (t && r.close(),
              (r.domElement.style.display = t ? "none" : ""),
              this.onResize());
          }),
          (dat.GUI.prototype.hideFolder = function(e) {
            return this.showFolder(e, !0);
          }),
          (dat.GUI.prototype.showController = function(e, t) {
            let r = this.__controllers.filter(t => t.property === e)[0];
            r &&
              ((r.domElement.style.display = t ? "none" : ""), this.onResize());
          }),
          (dat.GUI.prototype.hideController = function(e) {
            return this.showController(e, !0);
          }),
          this.gui.add(this, "enableDrawing");
        let r = this.gui.add(this, "baseMesh", this.avatarMeshes),
          a = this.gui.add(this, "baseTexture", this.avatarTextures),
          o = [];
        o.push(
          this.gui.add(
            this.currentOptions,
            "currentBrush",
            Object.keys(this.brushes).filter(e => "image" !== e)
          )
        ),
          o.push(this.gui.add(this.currentOptions, "size", 0, 50)),
          o.push(this.gui.add(this.currentOptions, "randomSize")),
          o.push(this.gui.addColor(this.currentOptions, "color")),
          o.push(this.gui.add(this.currentOptions, "randomColor")),
          o.push(this.gui.add(this.currentOptions, "opacity", 0, 1)),
          o.push(this.gui.add(this.currentOptions, "randomOpacity")),
          (this.shapeOptions = this.gui.addFolder("Stamp Options")),
          o.push(
            this.shapeOptions.add(this.currentOptions, "shape", [
              "circle",
              "square",
              "triangle",
              "pentagon",
              "hexagon",
              "octagon",
              "nonagon",
              "decagon",
              "dodecagon",
              "star"
            ])
          ),
          o.push(this.shapeOptions.add(this.currentOptions, "randomShape")),
          o.push(this.shapeOptions.add(this.currentOptions, "shapeFill")),
          o.push(
            this.shapeOptions.add(this.currentOptions, "shapeStrokeWidth", 0, 5)
          );
        let h = this.gui.addFolder("Pattern Options");
        o.push(
          h.add(this.currentOptions, "pattern", [
            "pokadot",
            "stripes",
            "vertical-stripes",
            "image"
          ])
        ),
          o.push(h.add(this.currentOptions, "patternSize", 0, 30)),
          o.push(h.add(this.currentOptions, "patternGutter", 0, 30)),
          o.push(h.add(this.currentOptions, "patternImage")),
          (this.resetCameraGui = this.gui.add(this, "resetCamera")),
          o.forEach(e =>
            e.onChange(() => {
              this.setOptions();
            })
          ),
          a.onChange(() => {
            confirm("This will reset your changes, are you sure?") &&
              this.setImage("textures/" + this.baseTexture + " TEX.jpg").then(
                () => {
                  (this.history.length = 0), (this.historyIndex = 0);
                }
              );
          }),
          r.onChange(() => {
            this.el.setAttribute("fbx-model", "src:" + this.baseMesh + ".FBX"),
              localStorage.setItem("baseMesh", this.baseMesh);
          }),
          (this.guiOptions = o),
          this.gui.hideFolder("Stamp Options"),
          this.gui.hideFolder("Pattern Options"),
          this.setOptions(),
          this.setupImageResize();
        let l = document.createElement("div");
        (l.style.border = "5px solid black;"),
          (l.style.position = "absolute"),
          (l.style.zIndex = "20"),
          (l.style.display = "none"),
          (l.className = "resize-drag-square"),
          (this.resizePreview = l);
        let c = document.createElement("div");
        (c.className = "takePicture"),
          (c.innerText = "TAKE PICTURE"),
          (c.style.position = "absolute"),
          (c.style.bottom = "0"),
          (c.style.right = "0");
        let u = document.createElement("canvas"),
          p = u.getContext("2d");
        c.addEventListener("click", () => {
          this.el.sceneEl.setAttribute(
            "screenshot",
            "width:" + window.innerWidth + ";height:" + window.innerHeight
          );
          let t = this.el.sceneEl.components.screenshot.getCanvas(
              "perspective"
            ),
            r = l.getBoundingClientRect();
          (u.width = r.width),
            (u.height = r.height),
            r.y < 2 && (r.y = 2),
            p.drawImage(
              t,
              r.x,
              r.y,
              r.width,
              r.height,
              0,
              0,
              r.width,
              r.height
            ),
            e.toBlob(
              e => {
                u.toBlob(
                  t => {
                    let r = { type: "avatarImage", image: e, preview: t };
                    this.parentWindow.postMessage(r, location.origin),
                      (this.resizePreview.style.display = "none");
                  },
                  "image/jpeg",
                  1
                );
              },
              "image/jpeg",
              1
            );
        }),
          l.appendChild(c),
          document.body.appendChild(l);
      },
      setNormalPose(e) {
        let t, r;
        this.baseMesh.traverse(e => {
          switch (e.name) {
            case "L_UpperArm":
              t = e;
              break;
            case "R_UpperArm":
              r = e;
          }
        }),
          new TWEEN.Tween({ x: e ? 0.25 * Math.PI : -0.4990267577735775 })
            .to({ x: e ? -0.4990267577735775 : 0.25 * Math.PI }, 350)
            .onUpdate(function() {
              (t.rotation.z = -this.x), (r.rotation.z = this.x);
            })
            .easing(TWEEN.Easing.Exponential.Out)
            .start();
      },
      reattachDatGui() {
        (this.guiOptions || []).forEach(e => {
          e.object = this.currentOptions;
        });
      },
      setImage(e) {
        return new Promise(t => {
          let r = new Image();
          (r.crossOrigin = "Anonymous"),
            (r.onload = () => {
              (this.currentImage = e),
                this.drawImage(0, 0, this.resolution, this.resolution),
                this.historyCanvasContext.drawImage(
                  r,
                  0,
                  0,
                  this.resolution,
                  this.resolution
                ),
                t();
            }),
            (r.src = e);
        });
      },
      drawImage(e, t, r, i) {
        let n = JSON.stringify(this.currentOptions);
        this.currentOptions = {
          currentBrush: "image",
          size: r,
          color: null,
          opacity: 1,
          shape: null,
          shapeFill: !1,
          shapeStrokeWidth: null,
          pattern: null,
          patternImage: this.currentImage,
          patternSize: i,
          patternGutter: null,
          randomColor: !1,
          randomSize: !1,
          randomOpacity: !1,
          randomShape: !1
        };
        let s = {
          type: "image",
          options: JSON.stringify(this.currentOptions),
          points: [new THREE.Vector2(e, t)]
        };
        this.history.push(s),
          (this.historyIndex = this.history.length - 1),
          this.setOptions(),
          this.brushes.image.draw(s.points[0]),
          (this.currentOptions = JSON.parse(n)),
          this.setOptions(),
          this.reattachDatGui();
      },
      setupImageResize() {
        let e = () => {
          document.querySelector(".resize-container").style.height =
            this.resolution *
              (document.querySelector("#paintCanvas").clientWidth /
                this.resolution) +
            "px";
        };
        window.addEventListener("resize", e);
        let t = document.getElementById("addImageHidden");
        t.addEventListener("input", e => {
          let r = new FileReader();
          r.readAsDataURL(t.files[0]);
          let i = this;
          r.onloadend = function() {
            i.currentImage = this.result;
            let e = document.getElementById("insertImage");
            (e.onload = () => {
              (document.querySelector(".resize-drag").style.width =
                e.width *
                (document.querySelector("#paintCanvas").clientWidth /
                  i.resolution)),
                (document.querySelector(".resize-drag").style.height =
                  e.height *
                  (document.querySelector("#paintCanvas").clientWidth /
                    i.resolution)),
                (document.querySelector(".resize-container").style.display =
                  "block");
            }),
              (e.src = this.result);
          };
        }),
          (this.isImageViewOpen = !1);
        let r = document.getElementById("renderOutput"),
          i = document.getElementById("imageOutput"),
          n = document.querySelector(".nextBack");
        n.addEventListener("click", () => {
          (this.isImageViewOpen = !this.isImageViewOpen),
            this.isImageViewOpen
              ? ((n.src =
                  "https://cdn.theexpanse.app/images/baseline-navigate_before-24px.svg"),
                (n.style.left = window.innerWidth / 2 + 10 + "px"),
                i.setAttribute("style", ""),
                r.setAttribute("style", ""),
                this.el.sceneEl.resize())
              : ((n.src =
                  "https://cdn.theexpanse.app/images/baseline-navigate_next-24px.svg"),
                (n.style.left = "10px"),
                r.setAttribute(
                  "style",
                  "width:100%!important;height:100%!important"
                ),
                i.setAttribute(
                  "style",
                  "width:0%!important;height:0!important"
                ),
                this.el.sceneEl.resize());
        });
        let s = document.querySelector(".saveImage");
        s.style.display = "none";
        let a = document.querySelector(".clearImage");
        a.style.display = "none";
        let o = document.querySelector(".addImage");
        o.style.display = "none";
        let h = document.querySelector(".downloadImage");
        (h.style.display = "none"),
          window.addEventListener("message", e => {
            if (e.data.type)
              switch (e.data.type) {
                case "loadAvatarImage":
                  let t = new Image();
                  (t.crossOrigin = "Anonymous"),
                    (t.onload = () => {
                      this.context.drawImage(t, 0, 0);
                    }),
                    (t.src = "https://cdn.theexpanse.app/" + e.data.image);
              }
            else
              switch (e.data) {
                case "clearImage":
                  a.click();
                  break;
                case "addImage":
                  this.isImageViewOpen || n.click(), o.click();
                  break;
                case "saveImage":
                  (this.parentWindow = e.source), s.click();
                  break;
                case "downloadImage":
                  h.click();
              }
          }),
          s.addEventListener("click", () => {
            this.isImageViewOpen && n.click(),
              (this.resizePreview.style.display = "block"),
              (this.resizePreview.style.top =
                window.innerHeight / 2 - 250 + "px"),
              (this.resizePreview.style.left =
                window.innerWidth / 2 - 250 + "px"),
              (this.resizePreview.style.width = "500px"),
              (this.resizePreview.style.height = "500px");
          }),
          a.addEventListener("click", () => {
            localStorage.removeItem("currentImage"), window.location.reload();
          }),
          o.addEventListener("click", () => {
            e(), t.click();
          }),
          document
            .querySelector(".imageClose")
            .addEventListener("click", () => {
              document.querySelector(".resize-container").style.display =
                "none";
            }),
          document.querySelector(".imageView").addEventListener("click", () => {
            let e = document
                .querySelector(".resize-drag")
                .getBoundingClientRect(),
              t = document
                .querySelector("#paintCanvas")
                .getBoundingClientRect(),
              r = e => (this.resolution / t.width) * e;
            this.drawImage(
              r(e.left),
              r(e.top - t.top),
              r(e.width),
              r(e.height)
            );
          }),
          document.querySelector(".imageDone").addEventListener("click", () => {
            document.querySelector(".resize-container").style.display = "none";
          }),
          this.data.cameraEl.removeAttribute("look-controls"),
          document.body.setAttribute("style", ""),
          (window.dragMoveListener = function(e) {
            let t = e.target,
              r = (parseFloat(t.getAttribute("data-x")) || 0) + e.dx,
              i = (parseFloat(t.getAttribute("data-y")) || 0) + e.dy;
            (t.style.webkitTransform = t.style.transform =
              "translate(" + r + "px, " + i + "px)"),
              t.setAttribute("data-x", r),
              t.setAttribute("data-y", i);
          });
        let l = {
            onmove: window.dragMoveListener,
            restrict: {
              restriction: "parent",
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            }
          },
          c = function(e) {
            let t = e.target,
              r = parseFloat(t.getAttribute("data-x")) || 0,
              i = parseFloat(t.getAttribute("data-y")) || 0;
            (t.style.width = e.rect.width + "px"),
              (t.style.height = e.rect.height + "px"),
              (r += e.deltaRect.left),
              (i += e.deltaRect.top),
              (t.style.webkitTransform = t.style.transform =
                "translate(" + r + "px," + i + "px)"),
              t.setAttribute("data-x", r),
              t.setAttribute("data-y", i);
          };
        interact(".resize-drag")
          .draggable(l)
          .resizable({
            edges: { left: !0, right: !0, bottom: !0, top: !0 },
            restrictEdges: { outer: "parent", endOnly: !0 },
            restrictSize: { min: { width: 100, height: 50 } },
            inertia: !0
          })
          .on("resizemove", c),
          interact(".resize-drag-square")
            .draggable(l)
            .resizable({
              square: !0,
              edges: { left: !0, right: !0, bottom: !0, top: !0 },
              restrictEdges: { outer: "parent", endOnly: !0 },
              restrictSize: { min: { width: 128, height: 128 } },
              inertia: !0
            })
            .on("resizemove", c);
      },
      setOptions() {
        this.brushes[this.currentOptions.currentBrush].setOptions(
          this.currentOptions.randomSize ? "random" : this.currentOptions.size,
          this.currentOptions.randomColor
            ? "random"
            : this.currentOptions.color,
          this.currentOptions.randomOpacity
            ? "random"
            : this.currentOptions.opacity,
          this.currentOptions.randomShape
            ? "random"
            : this.currentOptions.shape,
          this.currentOptions.pattern,
          this.currentOptions.patternImage,
          this.currentOptions.patternSize,
          this.currentOptions.patternGutter,
          this.currentOptions.shapeFill,
          this.currentOptions.shapeStrokeWidth
        ),
          this.currentOptions.randomSize
            ? this.gui.hideController("size")
            : this.gui.showController("size"),
          this.currentOptions.randomColor
            ? this.gui.hideController("color")
            : this.gui.showController("color"),
          this.currentOptions.randomOpacity
            ? this.gui.hideController("opacity")
            : this.gui.showController("opacity"),
          this.currentOptions.randomShape
            ? this.shapeOptions.hideController("shape")
            : this.shapeOptions.showController("shape"),
          "pattern" === this.currentOptions.currentBrush
            ? this.gui.showFolder("Pattern Options")
            : this.gui.hideFolder("Pattern Options"),
          "stamp" === this.currentOptions.currentBrush
            ? this.gui.showFolder("Stamp Options")
            : this.gui.hideFolder("Stamp Options");
      },
      redo() {
        this.historyIndex < this.history.length - 1 &&
          (this.historyIndex++, this.undoRedo());
      },
      undo() {
        this.historyIndex > -1 && (this.historyIndex--, this.undoRedo());
      },
      undoRedo() {
        this.context.drawImage(
          this.historyCanvas,
          0,
          0,
          this.resolution,
          this.resolution
        );
        for (let e = 0; e <= this.historyIndex; e++)
          (this.currentOptions = JSON.parse(this.history[e].options)),
            (this.currentOptions.currentBrush = this.history[e].type),
            this.setOptions(),
            this.history[e].points.forEach(e => {
              this.brushes[this.currentOptions.currentBrush].draw(e);
            }),
            this.brushes[this.currentOptions.currentBrush].stop(),
            this.reattachDatGui();
      },
      setupEvents() {
        this.renderOutput.addEventListener("mousemove", e => {
          this.enableDrawing &&
            (this.isImageViewOpen
              ? window.innerWidth > 900
                ? ((this.mouse.x =
                    ((e.pageX - window.innerWidth / 2) /
                      (window.innerWidth / 2)) *
                      2 -
                    1),
                  (this.mouse.y = (-e.pageY / window.innerHeight) * 2 + 1))
                : ((this.mouse.x = (e.pageX / window.innerWidth) * 2 - 1),
                  (this.mouse.y =
                    (-e.pageY / (window.innerHeight / 2)) * 2 + 1))
              : ((this.mouse.x = (e.pageX / window.innerWidth) * 2 - 1),
                (this.mouse.y = (-e.pageY / window.innerHeight) * 2 + 1)));
        }),
          this.renderOutput.addEventListener("mousedown", e => {
            this.enableDrawing &&
              this.isIntersecting &&
              ((this.savePosition = this.data.cameraEl.object3D.children[0].position.clone()),
              (this.saveTarget = this.data.cameraEl.components[
                "orbit-controls"
              ].controls.target.clone()),
              this.data.cameraEl.setAttribute("orbit-controls", {
                enabled: !1
              }),
              (this.currentStroke = {
                type: this.currentOptions.currentBrush,
                options: JSON.stringify(this.currentOptions),
                points: []
              }),
              (this.isDragging = !0));
          }),
          this.renderOutput.addEventListener("mouseup", e => {
            this.enableDrawing &&
              this.isDragging &&
              (this.data.cameraEl.setAttribute("orbit-controls", {
                enabled: !0,
                initialPosition: this.savePosition,
                target: this.saveTarget
              }),
              this.historyIndex < this.history.length - 1 &&
                (this.history = this.history.slice(0, this.historyIndex + 1)),
              this.brushes[this.currentOptions.currentBrush].stop(),
              this.history.length,
              (this.historyIndex = this.history.length - 1),
              delete this.currentStroke,
              (this.isDragging = !1));
          });
      },
      resetCamera() {
        this.data.cameraEl.getObject3D("camera").position.set(0, -0.1, 1.5),
          this.data.cameraEl.setAttribute("orbit-controls", { enabled: !1 }),
          this.data.cameraEl.setAttribute("orbit-controls", {
            enabled: !0,
            initialPosition: "0 -0.1 1.5",
            target: "0 0 0"
          });
      },
      cacheCanvasHistory(e) {
        let t = JSON.stringify(this.currentOptions);
        (this.currentOptions = JSON.parse(e.options)),
          (this.brushes[e.type].context = this.historyCanvasContext),
          this.setOptions(),
          e.points.forEach(t => {
            this.brushes[e.type].draw(t);
          }),
          this.brushes[e.type].stop(),
          (this.brushes[e.type].context = this.context),
          (this.currentOptions = JSON.parse(t)),
          this.setOptions(),
          this.reattachDatGui();
      },
      uvToCanvas(e) {
        return new THREE.Vector2(
          this.resolution * e.uv.x,
          this.resolution - this.resolution * e.uv.y
        );
      },
      tick() {
        (this.canvasTexture.needsUpdate = !0),
          this.raycaster.setFromCamera(this.mouse, this.el.sceneEl.camera);
        let e = this.raycaster.intersectObjects(this.el.object3D.children, !0);
        if (e.length) {
          this.isIntersecting = !0;
          let t = e[0];
          if (this.isDragging) {
            let e = this.uvToCanvas(t);
            this.currentStroke.points.push(e),
              this.brushes[this.currentOptions.currentBrush].draw(e);
          }
        } else this.isIntersecting = !1;
      }
    });
  }
});
