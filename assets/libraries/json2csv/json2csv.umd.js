!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).json2csv = {}));
})(this, function (t) {
  "use strict";
  var e;
  function a() {}
  function f() {
    f.init.call(this);
  }
  function s(t) {
    return void 0 === t._maxListeners ? f.defaultMaxListeners : t._maxListeners;
  }
  function r(t, e, r, n) {
    var i, o;
    if ("function" != typeof r)
      throw new TypeError('"listener" argument must be a function');
    return (
      (i = t._events)
        ? (i.newListener &&
            (t.emit("newListener", e, r.listener || r), (i = t._events)),
          (o = i[e]))
        : ((i = t._events = new a()), (t._eventsCount = 0)),
      o
        ? ("function" == typeof o
            ? (o = i[e] = n ? [r, o] : [o, r])
            : n
            ? o.unshift(r)
            : o.push(r),
          o.warned ||
            ((n = s(t)) &&
              0 < n &&
              o.length > n &&
              ((o.warned = !0),
              ((n = new Error(
                "Possible EventEmitter memory leak detected. " +
                  o.length +
                  " " +
                  e +
                  " listeners added. Use emitter.setMaxListeners() to increase limit"
              )).name = "MaxListenersExceededWarning"),
              (n.emitter = t),
              (n.type = e),
              (n.count = o.length),
              (n = n),
              "function" == typeof console.warn
                ? console.warn(n)
                : console.log(n))))
        : ((o = i[e] = r), ++t._eventsCount),
      t
    );
  }
  function n(t, e, r) {
    var n = !1;
    function i() {
      t.removeListener(e, i), n || ((n = !0), r.apply(t, arguments));
    }
    return (i.listener = r), i;
  }
  function i(t) {
    var e = this._events;
    if (e) {
      t = e[t];
      if ("function" == typeof t) return 1;
      if (t) return t.length;
    }
    return 0;
  }
  function c(t, e) {
    for (var r = new Array(e); e--; ) r[e] = t[e];
    return r;
  }
  (a.prototype = Object.create(null)),
    ((f.EventEmitter = f).usingDomains = !1),
    (f.prototype.domain = void 0),
    (f.prototype._events = void 0),
    (f.prototype._maxListeners = void 0),
    (f.defaultMaxListeners = 10),
    (f.init = function () {
      (this.domain = null),
        f.usingDomains && e.active && e.Domain,
        (this._events &&
          this._events !== Object.getPrototypeOf(this)._events) ||
          ((this._events = new a()), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (f.prototype.setMaxListeners = function (t) {
      if ("number" != typeof t || t < 0 || isNaN(t))
        throw new TypeError('"n" argument must be a positive number');
      return (this._maxListeners = t), this;
    }),
    (f.prototype.getMaxListeners = function () {
      return s(this);
    }),
    (f.prototype.emit = function (t, e, r, n) {
      var i,
        o,
        s = "error" === t,
        a = this._events;
      if (a) s = s && null == a.error;
      else if (!s) return !1;
      if (((u = this.domain), s)) {
        if (((s = e), u))
          return (
            ((s =
              s ||
              new Error(
                'Uncaught, unspecified "error" event'
              )).domainEmitter = this),
            (s.domain = u),
            (s.domainThrown = !1),
            u.emit("error", s),
            !1
          );
        if (s instanceof Error) throw s;
        var u = new Error('Uncaught, unspecified "error" event. (' + s + ")");
        throw ((u.context = s), u);
      }
      if (!(a = a[t])) return !1;
      var h,
        t = "function" == typeof a;
      switch ((h = arguments.length)) {
        case 1:
          !(function (t, e, r) {
            if (e) t.call(r);
            else
              for (var n = t.length, i = c(t, n), o = 0; o < n; ++o)
                i[o].call(r);
          })(a, t, this);
          break;
        case 2:
          !(function (t, e, r, n) {
            if (e) t.call(r, n);
            else
              for (var i = t.length, o = c(t, i), s = 0; s < i; ++s)
                o[s].call(r, n);
          })(a, t, this, e);
          break;
        case 3:
          !(function (t, e, r, n, i) {
            if (e) t.call(r, n, i);
            else
              for (var o = t.length, s = c(t, o), a = 0; a < o; ++a)
                s[a].call(r, n, i);
          })(a, t, this, e, r);
          break;
        case 4:
          !(function (t, e, r, n, i, o) {
            if (e) t.call(r, n, i, o);
            else
              for (var s = t.length, a = c(t, s), u = 0; u < s; ++u)
                a[u].call(r, n, i, o);
          })(a, t, this, e, r, n);
          break;
        default:
          for (i = new Array(h - 1), o = 1; o < h; o++) i[o - 1] = arguments[o];
          !(function (t, e, r, n) {
            if (e) t.apply(r, n);
            else
              for (var i = t.length, o = c(t, i), s = 0; s < i; ++s)
                o[s].apply(r, n);
          })(a, t, this, i);
      }
      return !0;
    }),
    (f.prototype.addListener = function (t, e) {
      return r(this, t, e, !1);
    }),
    (f.prototype.on = f.prototype.addListener),
    (f.prototype.prependListener = function (t, e) {
      return r(this, t, e, !0);
    }),
    (f.prototype.once = function (t, e) {
      if ("function" != typeof e)
        throw new TypeError('"listener" argument must be a function');
      return this.on(t, n(this, t, e)), this;
    }),
    (f.prototype.prependOnceListener = function (t, e) {
      if ("function" != typeof e)
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(t, n(this, t, e)), this;
    }),
    (f.prototype.removeListener = function (t, e) {
      var r, n, i, o, s;
      if ("function" != typeof e)
        throw new TypeError('"listener" argument must be a function');
      if (!(n = this._events)) return this;
      if (!(r = n[t])) return this;
      if (r === e || (r.listener && r.listener === e))
        0 == --this._eventsCount
          ? (this._events = new a())
          : (delete n[t],
            n.removeListener &&
              this.emit("removeListener", t, r.listener || e));
      else if ("function" != typeof r) {
        for (i = -1, o = r.length; 0 < o--; )
          if (r[o] === e || (r[o].listener && r[o].listener === e)) {
            (s = r[o].listener), (i = o);
            break;
          }
        if (i < 0) return this;
        if (1 === r.length) {
          if (((r[0] = void 0), 0 == --this._eventsCount))
            return (this._events = new a()), this;
          delete n[t];
        } else
          !(function (t, e) {
            for (var r = e, n = r + 1, i = t.length; n < i; r += 1, n += 1)
              t[r] = t[n];
            t.pop();
          })(r, i);
        n.removeListener && this.emit("removeListener", t, s || e);
      }
      return this;
    }),
    (f.prototype.removeAllListeners = function (t) {
      var e,
        r = this._events;
      if (!r) return this;
      if (!r.removeListener)
        return (
          0 === arguments.length
            ? ((this._events = new a()), (this._eventsCount = 0))
            : r[t] &&
              (0 == --this._eventsCount
                ? (this._events = new a())
                : delete r[t]),
          this
        );
      if (0 === arguments.length) {
        for (var n, i = Object.keys(r), o = 0; o < i.length; ++o)
          "removeListener" !== (n = i[o]) && this.removeAllListeners(n);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = new a()),
          (this._eventsCount = 0),
          this
        );
      }
      if ("function" == typeof (e = r[t])) this.removeListener(t, e);
      else if (e) for (; this.removeListener(t, e[e.length - 1]), e[0]; );
      return this;
    }),
    (f.prototype.listeners = function (t) {
      var e = this._events,
        r =
          e && (r = e[t])
            ? "function" == typeof r
              ? [r.listener || r]
              : (function (t) {
                  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
                    e[r] = t[r].listener || t[r];
                  return e;
                })(r)
            : [];
      return r;
    }),
    (f.listenerCount = function (t, e) {
      return "function" == typeof t.listenerCount
        ? t.listenerCount(e)
        : i.call(t, e);
    }),
    (f.prototype.listenerCount = i),
    (f.prototype.eventNames = function () {
      return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : [];
    });
  var u =
      "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : {},
    h = [],
    l = [],
    p = "undefined" != typeof Uint8Array ? Uint8Array : Array,
    d = !1;
  function g() {
    d = !0;
    for (
      var t =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        e = 0,
        r = t.length;
      e < r;
      ++e
    )
      (h[e] = t[e]), (l[t.charCodeAt(e)] = e);
    (l["-".charCodeAt(0)] = 62), (l["_".charCodeAt(0)] = 63);
  }
  function y(t, e, r) {
    for (var n, i = [], o = e; o < r; o += 3)
      (n = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2]),
        i.push(
          h[((n = n) >> 18) & 63] +
            h[(n >> 12) & 63] +
            h[(n >> 6) & 63] +
            h[63 & n]
        );
    return i.join("");
  }
  function v(t) {
    var e;
    d || g();
    for (
      var r = t.length, n = r % 3, i = "", o = [], s = 0, a = r - n;
      s < a;
      s += 16383
    )
      o.push(y(t, s, a < s + 16383 ? a : s + 16383));
    return (
      1 == n
        ? ((e = t[r - 1]),
          (i += h[e >> 2]),
          (i += h[(e << 4) & 63]),
          (i += "=="))
        : 2 == n &&
          ((e = (t[r - 2] << 8) + t[r - 1]),
          (i += h[e >> 10]),
          (i += h[(e >> 4) & 63]),
          (i += h[(e << 2) & 63]),
          (i += "=")),
      o.push(i),
      o.join("")
    );
  }
  function o(t, e, r, n, i) {
    var o,
      s,
      a = 8 * i - n - 1,
      u = (1 << a) - 1,
      h = u >> 1,
      f = -7,
      c = r ? i - 1 : 0,
      l = r ? -1 : 1,
      r = t[e + c];
    for (
      c += l, o = r & ((1 << -f) - 1), r >>= -f, f += a;
      0 < f;
      o = 256 * o + t[e + c], c += l, f -= 8
    );
    for (
      s = o & ((1 << -f) - 1), o >>= -f, f += n;
      0 < f;
      s = 256 * s + t[e + c], c += l, f -= 8
    );
    if (0 === o) o = 1 - h;
    else {
      if (o === u) return s ? NaN : (1 / 0) * (r ? -1 : 1);
      (s += Math.pow(2, n)), (o -= h);
    }
    return (r ? -1 : 1) * s * Math.pow(2, o - n);
  }
  function b(t, e, r, n, i, o) {
    var s,
      a,
      u = 8 * o - i - 1,
      h = (1 << u) - 1,
      f = h >> 1,
      c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      l = n ? 0 : o - 1,
      p = n ? 1 : -1,
      o = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
    for (
      e = Math.abs(e),
        isNaN(e) || e === 1 / 0
          ? ((a = isNaN(e) ? 1 : 0), (s = h))
          : ((s = Math.floor(Math.log(e) / Math.LN2)),
            e * (n = Math.pow(2, -s)) < 1 && (s--, (n *= 2)),
            2 <= (e += 1 <= s + f ? c / n : c * Math.pow(2, 1 - f)) * n &&
              (s++, (n /= 2)),
            h <= s + f
              ? ((a = 0), (s = h))
              : 1 <= s + f
              ? ((a = (e * n - 1) * Math.pow(2, i)), (s += f))
              : ((a = e * Math.pow(2, f - 1) * Math.pow(2, i)), (s = 0)));
      8 <= i;
      t[r + l] = 255 & a, l += p, a /= 256, i -= 8
    );
    for (
      s = (s << i) | a, u += i;
      0 < u;
      t[r + l] = 255 & s, l += p, s /= 256, u -= 8
    );
    t[r + l - p] |= 128 * o;
  }
  var w = {}.toString,
    m =
      Array.isArray ||
      function (t) {
        return "[object Array]" == w.call(t);
      };
  function _() {
    return E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function S(t, e) {
    if (_() < e) throw new RangeError("Invalid typed array length");
    return (
      E.TYPED_ARRAY_SUPPORT
        ? ((t = new Uint8Array(e)).__proto__ = E.prototype)
        : (null === t && (t = new E(e)), (t.length = e)),
      t
    );
  }
  function E(t, e, r) {
    if (!(E.TYPED_ARRAY_SUPPORT || this instanceof E)) return new E(t, e, r);
    if ("number" != typeof t) return R(this, t, e, r);
    if ("string" == typeof e)
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return k(this, t);
  }
  function R(t, e, r, n) {
    if ("number" == typeof e)
      throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
      ? (function (t, e, r, n) {
          if ((e.byteLength, r < 0 || e.byteLength < r))
            throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < r + (n || 0))
            throw new RangeError("'length' is out of bounds");
          e =
            void 0 === r && void 0 === n
              ? new Uint8Array(e)
              : void 0 === n
              ? new Uint8Array(e, r)
              : new Uint8Array(e, r, n);
          E.TYPED_ARRAY_SUPPORT
            ? ((t = e).__proto__ = E.prototype)
            : (t = T(t, e));
          return t;
        })(t, e, r, n)
      : "string" == typeof e
      ? (function (t, e, r) {
          ("string" == typeof r && "" !== r) || (r = "utf8");
          if (!E.isEncoding(r))
            throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | C(e, r),
            r = (t = S(t, n)).write(e, r);
          r !== n && (t = t.slice(0, r));
          return t;
        })(t, e, r)
      : (function (t, e) {
          if (L(e)) {
            var r = 0 | O(e.length);
            return 0 === (t = S(t, r)).length ? t : (e.copy(t, 0, 0, r), t);
          }
          if (e) {
            if (
              ("undefined" != typeof ArrayBuffer &&
                e.buffer instanceof ArrayBuffer) ||
              "length" in e
            )
              return "number" != typeof e.length ||
                (function (t) {
                  return t != t;
                })(e.length)
                ? S(t, 0)
                : T(t, e);
            if ("Buffer" === e.type && m(e.data)) return T(t, e.data);
          }
          throw new TypeError(
            "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
          );
        })(t, e);
  }
  function A(t) {
    if ("number" != typeof t)
      throw new TypeError('"size" argument must be a number');
    if (t < 0) throw new RangeError('"size" argument must not be negative');
  }
  function k(t, e) {
    if ((A(e), (t = S(t, e < 0 ? 0 : 0 | O(e))), !E.TYPED_ARRAY_SUPPORT))
      for (var r = 0; r < e; ++r) t[r] = 0;
    return t;
  }
  function T(t, e) {
    var r = e.length < 0 ? 0 : 0 | O(e.length);
    t = S(t, r);
    for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
    return t;
  }
  function O(t) {
    if (t >= _())
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          _().toString(16) +
          " bytes"
      );
    return 0 | t;
  }
  function L(t) {
    return null != t && t._isBuffer;
  }
  function C(t, e) {
    if (L(t)) return t.length;
    if (
      "undefined" != typeof ArrayBuffer &&
      "function" == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
    )
      return t.byteLength;
    "string" != typeof t && (t = "" + t);
    var r = t.length;
    if (0 === r) return 0;
    for (var n = !1; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
        case void 0:
          return $(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * r;
        case "hex":
          return r >>> 1;
        case "base64":
          return G(t).length;
        default:
          if (n) return $(t).length;
          (e = ("" + e).toLowerCase()), (n = !0);
      }
  }
  function j(t, e, r) {
    var n,
      i,
      o,
      s = !1;
    if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
    if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
      return "";
    if ((r >>>= 0) <= (e >>>= 0)) return "";
    for (t = t || "utf8"; ; )
      switch (t) {
        case "hex":
          return (function (t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0);
            (!r || r < 0 || n < r) && (r = n);
            for (var i = "", o = e; o < r; ++o)
              i += (function (t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16);
              })(t[o]);
            return i;
          })(this, e, r);
        case "utf8":
        case "utf-8":
          return I(this, e, r);
        case "ascii":
          return (function (t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n;
          })(this, e, r);
        case "latin1":
        case "binary":
          return (function (t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n;
          })(this, e, r);
        case "base64":
          return (
            (n = this),
            (o = r),
            0 === (i = e) && o === n.length ? v(n) : v(n.slice(i, o))
          );
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return (function (t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
              i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i;
          })(this, e, r);
        default:
          if (s) throw new TypeError("Unknown encoding: " + t);
          (t = (t + "").toLowerCase()), (s = !0);
      }
  }
  function P(t, e, r) {
    var n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  function B(t, e, r, n, i) {
    if (0 === t.length) return -1;
    if (
      ("string" == typeof r
        ? ((n = r), (r = 0))
        : 2147483647 < r
        ? (r = 2147483647)
        : r < -2147483648 && (r = -2147483648),
      (r = +r),
      isNaN(r) && (r = i ? 0 : t.length - 1),
      r < 0 && (r = t.length + r),
      r >= t.length)
    ) {
      if (i) return -1;
      r = t.length - 1;
    } else if (r < 0) {
      if (!i) return -1;
      r = 0;
    }
    if (("string" == typeof e && (e = E.from(e, n)), L(e)))
      return 0 === e.length ? -1 : M(t, e, r, n, i);
    if ("number" == typeof e)
      return (
        (e &= 255),
        E.TYPED_ARRAY_SUPPORT &&
        "function" == typeof Uint8Array.prototype.indexOf
          ? (i
              ? Uint8Array.prototype.indexOf
              : Uint8Array.prototype.lastIndexOf
            ).call(t, e, r)
          : M(t, [e], r, n, i)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function M(t, e, r, n, i) {
    var o = 1,
      s = t.length,
      a = e.length;
    if (
      void 0 !== n &&
      ("ucs2" === (n = String(n).toLowerCase()) ||
        "ucs-2" === n ||
        "utf16le" === n ||
        "utf-16le" === n)
    ) {
      if (t.length < 2 || e.length < 2) return -1;
      (s /= o = 2), (a /= 2), (r /= 2);
    }
    function u(t, e) {
      return 1 === o ? t[e] : t.readUInt16BE(e * o);
    }
    if (i)
      for (var h = -1, f = r; f < s; f++)
        if (u(t, f) === u(e, -1 === h ? 0 : f - h)) {
          if ((-1 === h && (h = f), f - h + 1 === a)) return h * o;
        } else -1 !== h && (f -= f - h), (h = -1);
    else
      for (s < r + a && (r = s - a), f = r; 0 <= f; f--) {
        for (var c = !0, l = 0; l < a; l++)
          if (u(t, f + l) !== u(e, l)) {
            c = !1;
            break;
          }
        if (c) return f;
      }
    return -1;
  }
  function x(t, e, r, n) {
    return V(
      (function (t) {
        for (var e = [], r = 0; r < t.length; ++r)
          e.push(255 & t.charCodeAt(r));
        return e;
      })(e),
      t,
      r,
      n
    );
  }
  function U(t, e, r, n) {
    return V(
      (function (t, e) {
        for (var r, n, i = [], o = 0; o < t.length && !((e -= 2) < 0); ++o)
          (n = t.charCodeAt(o)),
            (r = n >> 8),
            (n = n % 256),
            i.push(n),
            i.push(r);
        return i;
      })(e, t.length - r),
      t,
      r,
      n
    );
  }
  function I(t, e, r) {
    r = Math.min(t.length, r);
    for (var n = [], i = e; i < r; ) {
      var o,
        s,
        a,
        u,
        h = t[i],
        f = null,
        c = 239 < h ? 4 : 223 < h ? 3 : 191 < h ? 2 : 1;
      if (i + c <= r)
        switch (c) {
          case 1:
            h < 128 && (f = h);
            break;
          case 2:
            128 == (192 & (o = t[i + 1])) &&
              127 < (u = ((31 & h) << 6) | (63 & o)) &&
              (f = u);
            break;
          case 3:
            (o = t[i + 1]),
              (s = t[i + 2]),
              128 == (192 & o) &&
                128 == (192 & s) &&
                2047 < (u = ((15 & h) << 12) | ((63 & o) << 6) | (63 & s)) &&
                (u < 55296 || 57343 < u) &&
                (f = u);
            break;
          case 4:
            (o = t[i + 1]),
              (s = t[i + 2]),
              (a = t[i + 3]),
              128 == (192 & o) &&
                128 == (192 & s) &&
                128 == (192 & a) &&
                65535 <
                  (u =
                    ((15 & h) << 18) |
                    ((63 & o) << 12) |
                    ((63 & s) << 6) |
                    (63 & a)) &&
                u < 1114112 &&
                (f = u);
        }
      null === f
        ? ((f = 65533), (c = 1))
        : 65535 < f &&
          ((f -= 65536),
          n.push(((f >>> 10) & 1023) | 55296),
          (f = 56320 | (1023 & f))),
        n.push(f),
        (i += c);
    }
    return (function (t) {
      var e = t.length;
      if (e <= D) return String.fromCharCode.apply(String, t);
      var r = "",
        n = 0;
      for (; n < e; )
        r += String.fromCharCode.apply(String, t.slice(n, (n += D)));
      return r;
    })(n);
  }
  (E.TYPED_ARRAY_SUPPORT =
    void 0 === u.TYPED_ARRAY_SUPPORT || u.TYPED_ARRAY_SUPPORT),
    (E.poolSize = 8192),
    (E._augment = function (t) {
      return (t.__proto__ = E.prototype), t;
    }),
    (E.from = function (t, e, r) {
      return R(null, t, e, r);
    }),
    E.TYPED_ARRAY_SUPPORT &&
      ((E.prototype.__proto__ = Uint8Array.prototype),
      (E.__proto__ = Uint8Array)),
    (E.alloc = function (t, e, r) {
      return (
        (n = null),
        (e = e),
        (r = r),
        A((t = t)),
        !(t <= 0) && void 0 !== e
          ? "string" == typeof r
            ? S(n, t).fill(e, r)
            : S(n, t).fill(e)
          : S(n, t)
      );
      var n;
    }),
    (E.allocUnsafe = function (t) {
      return k(null, t);
    }),
    (E.allocUnsafeSlow = function (t) {
      return k(null, t);
    }),
    (E.isBuffer = K),
    (E.compare = function (t, e) {
      if (!L(t) || !L(e)) throw new TypeError("Arguments must be Buffers");
      if (t === e) return 0;
      for (
        var r = t.length, n = e.length, i = 0, o = Math.min(r, n);
        i < o;
        ++i
      )
        if (t[i] !== e[i]) {
          (r = t[i]), (n = e[i]);
          break;
        }
      return r < n ? -1 : n < r ? 1 : 0;
    }),
    (E.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (E.concat = function (t, e) {
      if (!m(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return E.alloc(0);
      if (void 0 === e) for (i = e = 0; i < t.length; ++i) e += t[i].length;
      for (var r = E.allocUnsafe(e), n = 0, i = 0; i < t.length; ++i) {
        var o = t[i];
        if (!L(o))
          throw new TypeError('"list" argument must be an Array of Buffers');
        o.copy(r, n), (n += o.length);
      }
      return r;
    }),
    (E.byteLength = C),
    (E.prototype._isBuffer = !0),
    (E.prototype.swap16 = function () {
      var t = this.length;
      if (t % 2 != 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var e = 0; e < t; e += 2) P(this, e, e + 1);
      return this;
    }),
    (E.prototype.swap32 = function () {
      var t = this.length;
      if (t % 4 != 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var e = 0; e < t; e += 4) P(this, e, e + 3), P(this, e + 1, e + 2);
      return this;
    }),
    (E.prototype.swap64 = function () {
      var t = this.length;
      if (t % 8 != 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var e = 0; e < t; e += 8)
        P(this, e, e + 7),
          P(this, e + 1, e + 6),
          P(this, e + 2, e + 5),
          P(this, e + 3, e + 4);
      return this;
    }),
    (E.prototype.toString = function () {
      var t = 0 | this.length;
      return 0 == t
        ? ""
        : 0 === arguments.length
        ? I(this, 0, t)
        : j.apply(this, arguments);
    }),
    (E.prototype.equals = function (t) {
      if (!L(t)) throw new TypeError("Argument must be a Buffer");
      return this === t || 0 === E.compare(this, t);
    }),
    (E.prototype.inspect = function () {
      var t = "";
      return (
        0 < this.length &&
          ((t = this.toString("hex", 0, 50).match(/.{2}/g).join(" ")),
          50 < this.length && (t += " ... ")),
        "<Buffer " + t + ">"
      );
    }),
    (E.prototype.compare = function (t, e, r, n, i) {
      if (!L(t)) throw new TypeError("Argument must be a Buffer");
      if (
        (void 0 === e && (e = 0),
        void 0 === r && (r = t ? t.length : 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = this.length),
        e < 0 || r > t.length || n < 0 || i > this.length)
      )
        throw new RangeError("out of range index");
      if (i <= n && r <= e) return 0;
      if (i <= n) return -1;
      if (r <= e) return 1;
      if (this === t) return 0;
      for (
        var o = (i >>>= 0) - (n >>>= 0),
          s = (r >>>= 0) - (e >>>= 0),
          a = Math.min(o, s),
          u = this.slice(n, i),
          h = t.slice(e, r),
          f = 0;
        f < a;
        ++f
      )
        if (u[f] !== h[f]) {
          (o = u[f]), (s = h[f]);
          break;
        }
      return o < s ? -1 : s < o ? 1 : 0;
    }),
    (E.prototype.includes = function (t, e, r) {
      return -1 !== this.indexOf(t, e, r);
    }),
    (E.prototype.indexOf = function (t, e, r) {
      return B(this, t, e, r, !0);
    }),
    (E.prototype.lastIndexOf = function (t, e, r) {
      return B(this, t, e, r, !1);
    }),
    (E.prototype.write = function (t, e, r, n) {
      if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
      else if (void 0 === r && "string" == typeof e)
        (n = e), (r = this.length), (e = 0);
      else {
        if (!isFinite(e))
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        (e |= 0),
          isFinite(r)
            ? ((r |= 0), void 0 === n && (n = "utf8"))
            : ((n = r), (r = void 0));
      }
      var i = this.length - e;
      if (
        ((void 0 === r || i < r) && (r = i),
        (0 < t.length && (r < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      n = n || "utf8";
      for (var o, s, a, u = !1; ; )
        switch (n) {
          case "hex":
            return (function (t, e, r, n) {
              r = Number(r) || 0;
              var i = t.length - r;
              if (
                ((!n || i < (n = Number(n))) && (n = i),
                (i = e.length) % 2 != 0)
              )
                throw new TypeError("Invalid hex string");
              i / 2 < n && (n = i / 2);
              for (var o = 0; o < n; ++o) {
                var s = parseInt(e.substr(2 * o, 2), 16);
                if (isNaN(s)) return o;
                t[r + o] = s;
              }
              return o;
            })(this, t, e, r);
          case "utf8":
          case "utf-8":
            return (s = e), (a = r), V($(t, (o = this).length - s), o, s, a);
          case "ascii":
            return x(this, t, e, r);
          case "latin1":
          case "binary":
            return x(this, t, e, r);
          case "base64":
            return (o = this), (s = e), (a = r), V(G(t), o, s, a);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return U(this, t, e, r);
          default:
            if (u) throw new TypeError("Unknown encoding: " + n);
            (n = ("" + n).toLowerCase()), (u = !0);
        }
    }),
    (E.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  var D = 4096;
  function N(t, e, r) {
    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
    if (r < t + e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function q(t, e, r, n, i, o) {
    if (!L(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (i < e || e < o)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length) throw new RangeError("Index out of range");
  }
  function Y(t, e, r, n) {
    e < 0 && (e = 65535 + e + 1);
    for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
      t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
  }
  function F(t, e, r, n) {
    e < 0 && (e = 4294967295 + e + 1);
    for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
      t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255;
  }
  function z(t, e, r, n) {
    if (r + n > t.length) throw new RangeError("Index out of range");
    if (r < 0) throw new RangeError("Index out of range");
  }
  function W(t, e, r, n, i) {
    return i || z(t, 0, r, 4), b(t, e, r, n, 23, 4), r + 4;
  }
  function J(t, e, r, n, i) {
    return i || z(t, 0, r, 8), b(t, e, r, n, 52, 8), r + 8;
  }
  (E.prototype.slice = function (t, e) {
    var r = this.length;
    if (
      ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r),
      (e = void 0 === e ? r : ~~e) < 0
        ? (e += r) < 0 && (e = 0)
        : r < e && (e = r),
      e < t && (e = t),
      E.TYPED_ARRAY_SUPPORT)
    )
      (i = this.subarray(t, e)).__proto__ = E.prototype;
    else
      for (var n = e - t, i = new E(n, void 0), o = 0; o < n; ++o)
        i[o] = this[o + t];
    return i;
  }),
    (E.prototype.readUIntLE = function (t, e, r) {
      (t |= 0), (e |= 0), r || N(t, e, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
        n += this[t + o] * i;
      return n;
    }),
    (E.prototype.readUIntBE = function (t, e, r) {
      (t |= 0), (e |= 0), r || N(t, e, this.length);
      for (var n = this[t + --e], i = 1; 0 < e && (i *= 256); )
        n += this[t + --e] * i;
      return n;
    }),
    (E.prototype.readUInt8 = function (t, e) {
      return e || N(t, 1, this.length), this[t];
    }),
    (E.prototype.readUInt16LE = function (t, e) {
      return e || N(t, 2, this.length), this[t] | (this[t + 1] << 8);
    }),
    (E.prototype.readUInt16BE = function (t, e) {
      return e || N(t, 2, this.length), (this[t] << 8) | this[t + 1];
    }),
    (E.prototype.readUInt32LE = function (t, e) {
      return (
        e || N(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
          16777216 * this[t + 3]
      );
    }),
    (E.prototype.readUInt32BE = function (t, e) {
      return (
        e || N(t, 4, this.length),
        16777216 * this[t] +
          ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      );
    }),
    (E.prototype.readIntLE = function (t, e, r) {
      (t |= 0), (e |= 0), r || N(t, e, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
        n += this[t + o] * i;
      return (i *= 128) <= n && (n -= Math.pow(2, 8 * e)), n;
    }),
    (E.prototype.readIntBE = function (t, e, r) {
      (t |= 0), (e |= 0), r || N(t, e, this.length);
      for (var n = e, i = 1, o = this[t + --n]; 0 < n && (i *= 256); )
        o += this[t + --n] * i;
      return (i *= 128) <= o && (o -= Math.pow(2, 8 * e)), o;
    }),
    (E.prototype.readInt8 = function (t, e) {
      return (
        e || N(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      );
    }),
    (E.prototype.readInt16LE = function (t, e) {
      e || N(t, 2, this.length);
      t = this[t] | (this[t + 1] << 8);
      return 32768 & t ? 4294901760 | t : t;
    }),
    (E.prototype.readInt16BE = function (t, e) {
      e || N(t, 2, this.length);
      t = this[t + 1] | (this[t] << 8);
      return 32768 & t ? 4294901760 | t : t;
    }),
    (E.prototype.readInt32LE = function (t, e) {
      return (
        e || N(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    }),
    (E.prototype.readInt32BE = function (t, e) {
      return (
        e || N(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    }),
    (E.prototype.readFloatLE = function (t, e) {
      return e || N(t, 4, this.length), o(this, t, !0, 23, 4);
    }),
    (E.prototype.readFloatBE = function (t, e) {
      return e || N(t, 4, this.length), o(this, t, !1, 23, 4);
    }),
    (E.prototype.readDoubleLE = function (t, e) {
      return e || N(t, 8, this.length), o(this, t, !0, 52, 8);
    }),
    (E.prototype.readDoubleBE = function (t, e) {
      return e || N(t, 8, this.length), o(this, t, !1, 52, 8);
    }),
    (E.prototype.writeUIntLE = function (t, e, r, n) {
      (t = +t),
        (e |= 0),
        (r |= 0),
        n || q(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      var i = 1,
        o = 0;
      for (this[e] = 255 & t; ++o < r && (i *= 256); )
        this[e + o] = (t / i) & 255;
      return e + r;
    }),
    (E.prototype.writeUIntBE = function (t, e, r, n) {
      (t = +t),
        (e |= 0),
        (r |= 0),
        n || q(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      var i = r - 1,
        o = 1;
      for (this[e + i] = 255 & t; 0 <= --i && (o *= 256); )
        this[e + i] = (t / o) & 255;
      return e + r;
    }),
    (E.prototype.writeUInt8 = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 1, 255, 0),
        E.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        (this[e] = 255 & t),
        e + 1
      );
    }),
    (E.prototype.writeUInt16LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 2, 65535, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : Y(this, t, e, !0),
        e + 2
      );
    }),
    (E.prototype.writeUInt16BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 2, 65535, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : Y(this, t, e, !1),
        e + 2
      );
    }),
    (E.prototype.writeUInt32LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 4, 4294967295, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e + 3] = t >>> 24),
            (this[e + 2] = t >>> 16),
            (this[e + 1] = t >>> 8),
            (this[e] = 255 & t))
          : F(this, t, e, !0),
        e + 4
      );
    }),
    (E.prototype.writeUInt32BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 4, 4294967295, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : F(this, t, e, !1),
        e + 4
      );
    }),
    (E.prototype.writeIntLE = function (t, e, r, n) {
      (t = +t),
        (e |= 0),
        n || q(this, t, e, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
      var i = 0,
        o = 1,
        s = 0;
      for (this[e] = 255 & t; ++i < r && (o *= 256); )
        t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
          (this[e + i] = (((t / o) >> 0) - s) & 255);
      return e + r;
    }),
    (E.prototype.writeIntBE = function (t, e, r, n) {
      (t = +t),
        (e |= 0),
        n || q(this, t, e, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
      var i = r - 1,
        o = 1,
        s = 0;
      for (this[e + i] = 255 & t; 0 <= --i && (o *= 256); )
        t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
          (this[e + i] = (((t / o) >> 0) - s) & 255);
      return e + r;
    }),
    (E.prototype.writeInt8 = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 1, 127, -128),
        E.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        (this[e] = 255 & t),
        e + 1
      );
    }),
    (E.prototype.writeInt16LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 2, 32767, -32768),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : Y(this, t, e, !0),
        e + 2
      );
    }),
    (E.prototype.writeInt16BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 2, 32767, -32768),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : Y(this, t, e, !1),
        e + 2
      );
    }),
    (E.prototype.writeInt32LE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 4, 2147483647, -2147483648),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24))
          : F(this, t, e, !0),
        e + 4
      );
    }),
    (E.prototype.writeInt32BE = function (t, e, r) {
      return (
        (t = +t),
        (e |= 0),
        r || q(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : F(this, t, e, !1),
        e + 4
      );
    }),
    (E.prototype.writeFloatLE = function (t, e, r) {
      return W(this, t, e, !0, r);
    }),
    (E.prototype.writeFloatBE = function (t, e, r) {
      return W(this, t, e, !1, r);
    }),
    (E.prototype.writeDoubleLE = function (t, e, r) {
      return J(this, t, e, !0, r);
    }),
    (E.prototype.writeDoubleBE = function (t, e, r) {
      return J(this, t, e, !1, r);
    }),
    (E.prototype.copy = function (t, e, r, n) {
      if (
        ((r = r || 0),
        n || 0 === n || (n = this.length),
        e >= t.length && (e = t.length),
        (e = e || 0),
        0 < n && n < r && (n = r),
        n === r)
      )
        return 0;
      if (0 === t.length || 0 === this.length) return 0;
      if (e < 0) throw new RangeError("targetStart out of bounds");
      if (r < 0 || r >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length),
        t.length - e < n - r && (n = t.length - e + r);
      var i,
        o = n - r;
      if (this === t && r < e && e < n)
        for (i = o - 1; 0 <= i; --i) t[i + e] = this[i + r];
      else if (o < 1e3 || !E.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < o; ++i) t[i + e] = this[i + r];
      else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
      return o;
    }),
    (E.prototype.fill = function (t, e, r, n) {
      if ("string" == typeof t) {
        var i;
        if (
          ("string" == typeof e
            ? ((n = e), (e = 0), (r = this.length))
            : "string" == typeof r && ((n = r), (r = this.length)),
          1 !== t.length || ((i = t.charCodeAt(0)) < 256 && (t = i)),
          void 0 !== n && "string" != typeof n)
        )
          throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !E.isEncoding(n))
          throw new TypeError("Unknown encoding: " + n);
      } else "number" == typeof t && (t &= 255);
      if (e < 0 || this.length < e || this.length < r)
        throw new RangeError("Out of range index");
      if (r <= e) return this;
      if (
        ((e >>>= 0),
        (r = void 0 === r ? this.length : r >>> 0),
        "number" == typeof (t = t || 0))
      )
        for (a = e; a < r; ++a) this[a] = t;
      else
        for (
          var o = L(t) ? t : $(new E(t, n).toString()), s = o.length, a = 0;
          a < r - e;
          ++a
        )
          this[a + e] = o[a % s];
      return this;
    });
  var H = /[^+\/0-9A-Za-z-_]/g;
  function $(t, e) {
    var r;
    e = e || 1 / 0;
    for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
      if (55295 < (r = t.charCodeAt(s)) && r < 57344) {
        if (!i) {
          if (56319 < r) {
            -1 < (e -= 3) && o.push(239, 191, 189);
            continue;
          }
          if (s + 1 === n) {
            -1 < (e -= 3) && o.push(239, 191, 189);
            continue;
          }
          i = r;
          continue;
        }
        if (r < 56320) {
          -1 < (e -= 3) && o.push(239, 191, 189), (i = r);
          continue;
        }
        r = 65536 + (((i - 55296) << 10) | (r - 56320));
      } else i && -1 < (e -= 3) && o.push(239, 191, 189);
      if (((i = null), r < 128)) {
        if (--e < 0) break;
        o.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0) break;
        o.push((r >> 6) | 192, (63 & r) | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0) break;
        o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
      } else {
        if (!(r < 1114112)) throw new Error("Invalid code point");
        if ((e -= 4) < 0) break;
        o.push(
          (r >> 18) | 240,
          ((r >> 12) & 63) | 128,
          ((r >> 6) & 63) | 128,
          (63 & r) | 128
        );
      }
    }
    return o;
  }
  function G(t) {
    return (function (t) {
      var e, r, n, i;
      d || g();
      var o = t.length;
      if (0 < o % 4)
        throw new Error("Invalid string. Length must be a multiple of 4");
      (n = "=" === t[o - 2] ? 2 : "=" === t[o - 1] ? 1 : 0),
        (i = new p((3 * o) / 4 - n)),
        (e = 0 < n ? o - 4 : o);
      for (var s = 0, a = 0; a < e; a += 4, 0)
        (r =
          (l[t.charCodeAt(a)] << 18) |
          (l[t.charCodeAt(a + 1)] << 12) |
          (l[t.charCodeAt(a + 2)] << 6) |
          l[t.charCodeAt(a + 3)]),
          (i[s++] = (r >> 16) & 255),
          (i[s++] = (r >> 8) & 255),
          (i[s++] = 255 & r);
      return (
        2 == n
          ? ((r = (l[t.charCodeAt(a)] << 2) | (l[t.charCodeAt(a + 1)] >> 4)),
            (i[s++] = 255 & r))
          : 1 == n &&
            ((r =
              (l[t.charCodeAt(a)] << 10) |
              (l[t.charCodeAt(a + 1)] << 4) |
              (l[t.charCodeAt(a + 2)] >> 2)),
            (i[s++] = (r >> 8) & 255),
            (i[s++] = 255 & r)),
        i
      );
    })(
      (function (t) {
        var e;
        if (
          (t = ((e = t).trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(
            H,
            ""
          )).length < 2
        )
          return "";
        for (; t.length % 4 != 0; ) t += "=";
        return t;
      })(t)
    );
  }
  function V(t, e, r, n) {
    for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
      e[i + r] = t[i];
    return i;
  }
  function K(t) {
    return (
      null != t &&
      (!!t._isBuffer ||
        Q(t) ||
        ("function" == typeof (t = t).readFloatLE &&
          "function" == typeof t.slice &&
          Q(t.slice(0, 0))))
    );
  }
  function Q(t) {
    return (
      !!t.constructor &&
      "function" == typeof t.constructor.isBuffer &&
      t.constructor.isBuffer(t)
    );
  }
  function Z() {
    throw new Error("setTimeout has not been defined");
  }
  function X() {
    throw new Error("clearTimeout has not been defined");
  }
  var tt = Z,
    et = X;
  function rt(e) {
    if (tt === setTimeout) return setTimeout(e, 0);
    if ((tt === Z || !tt) && setTimeout)
      return (tt = setTimeout), setTimeout(e, 0);
    try {
      return tt(e, 0);
    } catch (t) {
      try {
        return tt.call(null, e, 0);
      } catch (t) {
        return tt.call(this, e, 0);
      }
    }
  }
  "function" == typeof u.setTimeout && (tt = setTimeout),
    "function" == typeof u.clearTimeout && (et = clearTimeout);
  var nt,
    it = [],
    ot = !1,
    st = -1;
  function at() {
    ot &&
      nt &&
      ((ot = !1),
      nt.length ? (it = nt.concat(it)) : (st = -1),
      it.length && ut());
  }
  function ut() {
    if (!ot) {
      var t = rt(at);
      ot = !0;
      for (var e = it.length; e; ) {
        for (nt = it, it = []; ++st < e; ) nt && nt[st].run();
        (st = -1), (e = it.length);
      }
      (nt = null),
        (ot = !1),
        (function (e) {
          if (et === clearTimeout) return clearTimeout(e);
          if ((et === X || !et) && clearTimeout)
            return (et = clearTimeout), clearTimeout(e);
          try {
            et(e);
          } catch (t) {
            try {
              return et.call(null, e);
            } catch (t) {
              return et.call(this, e);
            }
          }
        })(t);
    }
  }
  function ht(t) {
    var e = new Array(arguments.length - 1);
    if (1 < arguments.length)
      for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
    it.push(new ft(t, e)), 1 !== it.length || ot || rt(ut);
  }
  function ft(t, e) {
    (this.fun = t), (this.array = e);
  }
  ft.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  var ct = u.performance || {},
    lt =
      (ct.now || ct.mozNow || ct.msNow || ct.oNow || ct.webkitNow,
      "function" == typeof Object.create
        ? function (t, e) {
            (t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              }));
          }
        : function (t, e) {
            t.super_ = e;
            function r() {}
            (r.prototype = e.prototype),
              (t.prototype = new r()),
              (t.prototype.constructor = t);
          }),
    pt = lt,
    dt = /%[sdj%]/g;
  var gt,
    yt = {};
  function vt(t, e) {
    var r = { seen: [], stylize: wt };
    return (
      3 <= arguments.length && (r.depth = arguments[2]),
      4 <= arguments.length && (r.colors = arguments[3]),
      Et(e)
        ? (r.showHidden = e)
        : e &&
          (function (t, e) {
            if (!e || !Ot(e)) return;
            var r = Object.keys(e),
              n = r.length;
            for (; n--; ) t[r[n]] = e[r[n]];
          })(r, e),
      kt(r.showHidden) && (r.showHidden = !1),
      kt(r.depth) && (r.depth = 2),
      kt(r.colors) && (r.colors = !1),
      kt(r.customInspect) && (r.customInspect = !0),
      r.colors && (r.stylize = bt),
      mt(r, t, r.depth)
    );
  }
  function bt(t, e) {
    e = vt.styles[e];
    return e
      ? "[" + vt.colors[e][0] + "m" + t + "[" + vt.colors[e][1] + "m"
      : t;
  }
  function wt(t, e) {
    return t;
  }
  function mt(e, r, n) {
    if (
      e.customInspect &&
      r &&
      jt(r.inspect) &&
      r.inspect !== vt &&
      (!r.constructor || r.constructor.prototype !== r)
    ) {
      var t = r.inspect(n, e);
      return At(t) || (t = mt(e, t, n)), t;
    }
    var i = (function (t, e) {
      if (kt(e)) return t.stylize("undefined", "undefined");
      if (At(e)) {
        var r =
          "'" +
          JSON.stringify(e)
            .replace(/^"|"$/g, "")
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"') +
          "'";
        return t.stylize(r, "string");
      }
      if ("number" == typeof e) return t.stylize("" + e, "number");
      if (Et(e)) return t.stylize("" + e, "boolean");
      if (Rt(e)) return t.stylize("null", "null");
    })(e, r);
    if (i) return i;
    var o,
      s = Object.keys(r),
      a =
        ((o = {}),
        s.forEach(function (t, e) {
          o[t] = !0;
        }),
        o);
    if (
      (e.showHidden && (s = Object.getOwnPropertyNames(r)),
      Ct(r) && (0 <= s.indexOf("message") || 0 <= s.indexOf("description")))
    )
      return _t(r);
    if (0 === s.length) {
      if (jt(r)) {
        var u = r.name ? ": " + r.name : "";
        return e.stylize("[Function" + u + "]", "special");
      }
      if (Tt(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");
      if (Lt(r)) return e.stylize(Date.prototype.toString.call(r), "date");
      if (Ct(r)) return _t(r);
    }
    var t = "",
      h = !1,
      i = ["{", "}"];
    return (
      (u = r),
      Array.isArray(u) && ((h = !0), (i = ["[", "]"])),
      jt(r) && (t = " [Function" + (r.name ? ": " + r.name : "") + "]"),
      Tt(r) && (t = " " + RegExp.prototype.toString.call(r)),
      Lt(r) && (t = " " + Date.prototype.toUTCString.call(r)),
      Ct(r) && (t = " " + _t(r)),
      0 !== s.length || (h && 0 != r.length)
        ? n < 0
          ? Tt(r)
            ? e.stylize(RegExp.prototype.toString.call(r), "regexp")
            : e.stylize("[Object]", "special")
          : (e.seen.push(r),
            (s = h
              ? (function (e, r, n, i, t) {
                  for (var o = [], s = 0, a = r.length; s < a; ++s)
                    Bt(r, String(s))
                      ? o.push(St(e, r, n, i, String(s), !0))
                      : o.push("");
                  return (
                    t.forEach(function (t) {
                      t.match(/^\d+$/) || o.push(St(e, r, n, i, t, !0));
                    }),
                    o
                  );
                })(e, r, n, a, s)
              : s.map(function (t) {
                  return St(e, r, n, a, t, h);
                })),
            e.seen.pop(),
            (function (t, e, r) {
              if (
                60 <
                t.reduce(function (t, e) {
                  return (
                    e.indexOf("\n"),
                    t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                  );
                }, 0)
              )
                return (
                  r[0] +
                  ("" === e ? "" : e + "\n ") +
                  " " +
                  t.join(",\n  ") +
                  " " +
                  r[1]
                );
              return r[0] + e + " " + t.join(", ") + " " + r[1];
            })(s, t, i))
        : i[0] + t + i[1]
    );
  }
  function _t(t) {
    return "[" + Error.prototype.toString.call(t) + "]";
  }
  function St(t, e, r, n, i, o) {
    var s,
      a,
      e = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] };
    if (
      (e.get
        ? (a = e.set
            ? t.stylize("[Getter/Setter]", "special")
            : t.stylize("[Getter]", "special"))
        : e.set && (a = t.stylize("[Setter]", "special")),
      Bt(n, i) || (s = "[" + i + "]"),
      a ||
        (t.seen.indexOf(e.value) < 0
          ? -1 <
              (a = Rt(r)
                ? mt(t, e.value, null)
                : mt(t, e.value, r - 1)).indexOf("\n") &&
            (a = o
              ? a
                  .split("\n")
                  .map(function (t) {
                    return "  " + t;
                  })
                  .join("\n")
                  .substr(2)
              : "\n" +
                a
                  .split("\n")
                  .map(function (t) {
                    return "   " + t;
                  })
                  .join("\n"))
          : (a = t.stylize("[Circular]", "special"))),
      kt(s))
    ) {
      if (o && i.match(/^\d+$/)) return a;
      s = (s = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
        ? ((s = s.substr(1, s.length - 2)), t.stylize(s, "name"))
        : ((s = s
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/(^"|"$)/g, "'")),
          t.stylize(s, "string"));
    }
    return s + ": " + a;
  }
  function Et(t) {
    return "boolean" == typeof t;
  }
  function Rt(t) {
    return null === t;
  }
  function At(t) {
    return "string" == typeof t;
  }
  function kt(t) {
    return void 0 === t;
  }
  function Tt(t) {
    return Ot(t) && "[object RegExp]" === Pt(t);
  }
  function Ot(t) {
    return "object" == typeof t && null !== t;
  }
  function Lt(t) {
    return Ot(t) && "[object Date]" === Pt(t);
  }
  function Ct(t) {
    return Ot(t) && ("[object Error]" === Pt(t) || t instanceof Error);
  }
  function jt(t) {
    return "function" == typeof t;
  }
  function Pt(t) {
    return Object.prototype.toString.call(t);
  }
  function Bt(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }
  function Mt() {
    (this.head = null), (this.tail = null), (this.length = 0);
  }
  (vt.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39],
  }),
    (vt.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red",
    }),
    (Mt.prototype.push = function (t) {
      t = { data: t, next: null };
      0 < this.length ? (this.tail.next = t) : (this.head = t),
        (this.tail = t),
        ++this.length;
    }),
    (Mt.prototype.unshift = function (t) {
      t = { data: t, next: this.head };
      0 === this.length && (this.tail = t), (this.head = t), ++this.length;
    }),
    (Mt.prototype.shift = function () {
      if (0 !== this.length) {
        var t = this.head.data;
        return (
          1 === this.length
            ? (this.head = this.tail = null)
            : (this.head = this.head.next),
          --this.length,
          t
        );
      }
    }),
    (Mt.prototype.clear = function () {
      (this.head = this.tail = null), (this.length = 0);
    }),
    (Mt.prototype.join = function (t) {
      if (0 === this.length) return "";
      for (var e = this.head, r = "" + e.data; (e = e.next); ) r += t + e.data;
      return r;
    }),
    (Mt.prototype.concat = function (t) {
      if (0 === this.length) return E.alloc(0);
      if (1 === this.length) return this.head.data;
      for (var e = E.allocUnsafe(t >>> 0), r = this.head, n = 0; r; )
        r.data.copy(e, n), (n += r.data.length), (r = r.next);
      return e;
    });
  var xt =
    E.isEncoding ||
    function (t) {
      switch (t && t.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return !0;
        default:
          return !1;
      }
    };
  function Ut(t) {
    switch (
      ((this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, "")),
      (function (t) {
        if (t && !xt(t)) throw new Error("Unknown encoding: " + t);
      })(t),
      this.encoding)
    ) {
      case "utf8":
        this.surrogateSize = 3;
        break;
      case "ucs2":
      case "utf16le":
        (this.surrogateSize = 2), (this.detectIncompleteChar = Dt);
        break;
      case "base64":
        (this.surrogateSize = 3), (this.detectIncompleteChar = Nt);
        break;
      default:
        return void (this.write = It);
    }
    (this.charBuffer = new E(6)),
      (this.charReceived = 0),
      (this.charLength = 0);
  }
  function It(t) {
    return t.toString(this.encoding);
  }
  function Dt(t) {
    (this.charReceived = t.length % 2),
      (this.charLength = this.charReceived ? 2 : 0);
  }
  function Nt(t) {
    (this.charReceived = t.length % 3),
      (this.charLength = this.charReceived ? 3 : 0);
  }
  (Ut.prototype.write = function (t) {
    for (var e = ""; this.charLength; ) {
      var r =
        t.length >= this.charLength - this.charReceived
          ? this.charLength - this.charReceived
          : t.length;
      if (
        (t.copy(this.charBuffer, this.charReceived, 0, r),
        (this.charReceived += r),
        this.charReceived < this.charLength)
      )
        return "";
      if (
        ((t = t.slice(r, t.length)),
        !(
          55296 <=
            (i = (e = this.charBuffer
              .slice(0, this.charLength)
              .toString(this.encoding)).charCodeAt(e.length - 1)) && i <= 56319
        ))
      ) {
        if ((this.charReceived = this.charLength = 0) === t.length) return e;
        break;
      }
      (this.charLength += this.surrogateSize), (e = "");
    }
    this.detectIncompleteChar(t);
    var n = t.length;
    this.charLength &&
      (t.copy(this.charBuffer, 0, t.length - this.charReceived, n),
      (n -= this.charReceived));
    var i,
      n = (e += t.toString(this.encoding, 0, n)).length - 1;
    if (55296 <= (i = e.charCodeAt(n)) && i <= 56319) {
      var o = this.surrogateSize;
      return (
        (this.charLength += o),
        (this.charReceived += o),
        this.charBuffer.copy(this.charBuffer, o, 0, o),
        t.copy(this.charBuffer, 0, 0, o),
        e.substring(0, n)
      );
    }
    return e;
  }),
    (Ut.prototype.detectIncompleteChar = function (t) {
      for (var e = 3 <= t.length ? 3 : t.length; 0 < e; e--) {
        var r = t[t.length - e];
        if (1 == e && r >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (e <= 2 && r >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (e <= 3 && r >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = e;
    }),
    (Ut.prototype.end = function (t) {
      var e,
        r,
        n = "";
      return (
        t && t.length && (n = this.write(t)),
        this.charReceived &&
          ((e = this.charReceived),
          (r = this.charBuffer),
          (t = this.encoding),
          (n += r.slice(0, e).toString(t))),
        n
      );
    }),
    (zt.ReadableState = Ft);
  var qt,
    Yt =
      (kt(gt) && (gt = ""),
      (qt = (qt = "stream").toUpperCase()),
      yt[qt] ||
        (new RegExp("\\b" + qt + "\\b", "i").test(gt)
          ? (yt[qt] = function () {
              var t = function (t) {
                if (!At(t)) {
                  for (var e = [], r = 0; r < arguments.length; r++)
                    e.push(vt(arguments[r]));
                  return e.join(" ");
                }
                for (
                  var r = 1,
                    n = arguments,
                    i = n.length,
                    o = String(t).replace(dt, function (t) {
                      if ("%%" === t) return "%";
                      if (i <= r) return t;
                      switch (t) {
                        case "%s":
                          return String(n[r++]);
                        case "%d":
                          return Number(n[r++]);
                        case "%j":
                          try {
                            return JSON.stringify(n[r++]);
                          } catch (t) {
                            return "[Circular]";
                          }
                        default:
                          return t;
                      }
                    }),
                    s = n[r];
                  r < i;
                  s = n[++r]
                )
                  Rt(s) || !Ot(s) ? (o += " " + s) : (o += " " + vt(s));
                return o;
              }.apply(null, arguments);
              console.error("%s %d: %s", qt, 0, t);
            })
          : (yt[qt] = function () {})),
      yt[qt]);
  function Ft(t, e) {
    (t = t || {}),
      (this.objectMode = !!t.objectMode),
      e instanceof ve &&
        (this.objectMode = this.objectMode || !!t.readableObjectMode);
    var r = t.highWaterMark,
      e = this.objectMode ? 16 : 16384;
    (this.highWaterMark = r || 0 === r ? r : e),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.buffer = new Mt()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.defaultEncoding = t.defaultEncoding || "utf8"),
      (this.ranOut = !1),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      t.encoding &&
        ((this.decoder = new Ut(t.encoding)), (this.encoding = t.encoding));
  }
  function zt(t) {
    if (!(this instanceof zt)) return new zt(t);
    (this._readableState = new Ft(t, this)),
      (this.readable = !0),
      t && "function" == typeof t.read && (this._read = t.read),
      f.call(this);
  }
  function Wt(t, e, r, n, i) {
    var o,
      s,
      a = (function (t, e) {
        var r = null;
        K(e) ||
          "string" == typeof e ||
          null == e ||
          t.objectMode ||
          (r = new TypeError("Invalid non-string/buffer chunk"));
        return r;
      })(e, r);
    return (
      a
        ? t.emit("error", a)
        : null === r
        ? ((e.reading = !1),
          (function (t, e) {
            if (e.ended) return;
            {
              var r;
              !e.decoder ||
                ((r = e.decoder.end()) &&
                  r.length &&
                  (e.buffer.push(r),
                  (e.length += e.objectMode ? 1 : r.length)));
            }
            (e.ended = !0), $t(t);
          })(t, e))
        : e.objectMode || (r && 0 < r.length)
        ? e.ended && !i
          ? ((o = new Error("stream.push() after EOF")), t.emit("error", o))
          : e.endEmitted && i
          ? ((o = new Error("stream.unshift() after end event")),
            t.emit("error", o))
          : (!e.decoder ||
              i ||
              n ||
              ((r = e.decoder.write(r)), (s = !e.objectMode && 0 === r.length)),
            i || (e.reading = !1),
            s ||
              (e.flowing && 0 === e.length && !e.sync
                ? (t.emit("data", r), t.read(0))
                : ((e.length += e.objectMode ? 1 : r.length),
                  i ? e.buffer.unshift(r) : e.buffer.push(r),
                  e.needReadable && $t(t))),
            (r = t),
            (t = e).readingMore || ((t.readingMore = !0), ht(Vt, r, t)))
        : i || (e.reading = !1),
      !(e = e).ended &&
        (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
    );
  }
  pt(zt, f),
    (zt.prototype.push = function (t, e) {
      var r = this._readableState;
      return (
        r.objectMode ||
          "string" != typeof t ||
          ((e = e || r.defaultEncoding) !== r.encoding &&
            ((t = E.from(t, e)), (e = ""))),
        Wt(this, r, t, e, !1)
      );
    }),
    (zt.prototype.unshift = function (t) {
      return Wt(this, this._readableState, t, "", !0);
    }),
    (zt.prototype.isPaused = function () {
      return !1 === this._readableState.flowing;
    }),
    (zt.prototype.setEncoding = function (t) {
      return (
        (this._readableState.decoder = new Ut(t)),
        (this._readableState.encoding = t),
        this
      );
    });
  var Jt = 8388608;
  function Ht(t, e) {
    return t <= 0 || (0 === e.length && e.ended)
      ? 0
      : e.objectMode
      ? 1
      : t != t
      ? (e.flowing && e.length ? e.buffer.head.data : e).length
      : (t > e.highWaterMark &&
          (e.highWaterMark =
            (Jt <= (r = t)
              ? (r = Jt)
              : (r--,
                (r |= r >>> 1),
                (r |= r >>> 2),
                (r |= r >>> 4),
                (r |= r >>> 8),
                (r |= r >>> 16),
                r++),
            r)),
        t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0));
    var r;
  }
  function $t(t) {
    var e = t._readableState;
    (e.needReadable = !1),
      e.emittedReadable ||
        (Yt("emitReadable", e.flowing),
        (e.emittedReadable = !0),
        e.sync ? ht(Gt, t) : Gt(t));
  }
  function Gt(t) {
    Yt("emit readable"), t.emit("readable"), Zt(t);
  }
  function Vt(t, e) {
    for (
      var r = e.length;
      !e.reading &&
      !e.flowing &&
      !e.ended &&
      e.length < e.highWaterMark &&
      (Yt("maybeReadMore read 0"), t.read(0), r !== e.length);

    )
      r = e.length;
    e.readingMore = !1;
  }
  function Kt(t) {
    Yt("readable nexttick read 0"), t.read(0);
  }
  function Qt(t, e) {
    e.reading || (Yt("resume read 0"), t.read(0)),
      (e.resumeScheduled = !1),
      (e.awaitDrain = 0),
      t.emit("resume"),
      Zt(t),
      e.flowing && !e.reading && t.read(0);
  }
  function Zt(t) {
    var e = t._readableState;
    for (Yt("flow", e.flowing); e.flowing && null !== t.read(); );
  }
  function Xt(t, e) {
    return 0 === e.length
      ? null
      : (e.objectMode
          ? (r = e.buffer.shift())
          : !t || t >= e.length
          ? ((r = e.decoder
              ? e.buffer.join("")
              : 1 === e.buffer.length
              ? e.buffer.head.data
              : e.buffer.concat(e.length)),
            e.buffer.clear())
          : (r = (function (t, e, r) {
              var n;
              t < e.head.data.length
                ? ((n = e.head.data.slice(0, t)),
                  (e.head.data = e.head.data.slice(t)))
                : (n =
                    t === e.head.data.length
                      ? e.shift()
                      : (r
                          ? function (t, e) {
                              var r = e.head,
                                n = 1,
                                i = r.data;
                              t -= i.length;
                              for (; (r = r.next); ) {
                                var o = r.data,
                                  s = t > o.length ? o.length : t;
                                if (
                                  (s === o.length
                                    ? (i += o)
                                    : (i += o.slice(0, t)),
                                  0 === (t -= s))
                                ) {
                                  s === o.length
                                    ? (++n,
                                      r.next
                                        ? (e.head = r.next)
                                        : (e.head = e.tail = null))
                                    : ((e.head = r).data = o.slice(s));
                                  break;
                                }
                                ++n;
                              }
                              return (e.length -= n), i;
                            }
                          : function (t, e) {
                              var r = E.allocUnsafe(t),
                                n = e.head,
                                i = 1;
                              n.data.copy(r), (t -= n.data.length);
                              for (; (n = n.next); ) {
                                var o = n.data,
                                  s = t > o.length ? o.length : t;
                                if (
                                  (o.copy(r, r.length - t, 0, s),
                                  0 === (t -= s))
                                ) {
                                  s === o.length
                                    ? (++i,
                                      n.next
                                        ? (e.head = n.next)
                                        : (e.head = e.tail = null))
                                    : ((e.head = n).data = o.slice(s));
                                  break;
                                }
                                ++i;
                              }
                              return (e.length -= i), r;
                            })(t, e));
              return n;
            })(t, e.buffer, e.decoder)),
        r);
    var r;
  }
  function te(t) {
    var e = t._readableState;
    if (0 < e.length)
      throw new Error('"endReadable()" called on non-empty stream');
    e.endEmitted || ((e.ended = !0), ht(ee, e, t));
  }
  function ee(t, e) {
    t.endEmitted ||
      0 !== t.length ||
      ((t.endEmitted = !0), (e.readable = !1), e.emit("end"));
  }
  function re(t, e) {
    for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
    return -1;
  }
  function ne() {}
  function ie(t, e, r) {
    (this.chunk = t),
      (this.encoding = e),
      (this.callback = r),
      (this.next = null);
  }
  function oe(t, o) {
    Object.defineProperty(this, "buffer", {
      get: (function t(e, r) {
        if (kt(u.process))
          return function () {
            return t(e, r).apply(this, arguments);
          };
        var n = !1;
        return function () {
          return n || (console.error(r), (n = !0)), e.apply(this, arguments);
        };
      })(function () {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead."),
    }),
      (t = t || {}),
      (this.objectMode = !!t.objectMode),
      o instanceof ve &&
        (this.objectMode = this.objectMode || !!t.writableObjectMode);
    var e = t.highWaterMark,
      r = this.objectMode ? 16 : 16384;
    (this.highWaterMark = e || 0 === e ? e : r),
      (this.highWaterMark = ~~this.highWaterMark),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1);
    r = (this.finished = !1) === t.decodeStrings;
    (this.decodeStrings = !r),
      (this.defaultEncoding = t.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (t) {
        var e, r, n, i;
        (r = t),
          (n = (e = o)._writableState),
          (i = n.sync),
          (t = n.writecb),
          (function (t) {
            (t.writing = !1),
              (t.writecb = null),
              (t.length -= t.writelen),
              (t.writelen = 0);
          })(n),
          r
            ? (function (t, e, r, n, i) {
                --e.pendingcb, r ? ht(i, n) : i(n);
                (t._writableState.errorEmitted = !0), t.emit("error", n);
              })(e, n, i, r, t)
            : ((r = fe(n)) ||
                n.corked ||
                n.bufferProcessing ||
                !n.bufferedRequest ||
                he(e, n),
              i ? ht(ue, e, n, r, t) : ue(e, n, r, t));
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new pe(this));
  }
  function se(t) {
    if (!(this instanceof se || this instanceof ve)) return new se(t);
    (this._writableState = new oe(t, this)),
      (this.writable = !0),
      t &&
        ("function" == typeof t.write && (this._write = t.write),
        "function" == typeof t.writev && (this._writev = t.writev)),
      f.call(this);
  }
  function ae(t, e, r, n, i, o, s) {
    (e.writelen = n),
      (e.writecb = s),
      (e.writing = !0),
      (e.sync = !0),
      r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite),
      (e.sync = !1);
  }
  function ue(t, e, r, n) {
    var i;
    r ||
      ((i = t),
      0 === (r = e).length &&
        r.needDrain &&
        ((r.needDrain = !1), i.emit("drain"))),
      e.pendingcb--,
      n(),
      le(t, e);
  }
  function he(t, e) {
    e.bufferProcessing = !0;
    var r = e.bufferedRequest;
    if (t._writev && r && r.next) {
      var n = e.bufferedRequestCount,
        i = new Array(n),
        n = e.corkedRequestsFree;
      n.entry = r;
      for (var o = 0; r; ) (r = (i[o] = r).next), (o += 1);
      ae(t, e, !0, e.length, i, "", n.finish),
        e.pendingcb++,
        (e.lastBufferedRequest = null),
        n.next
          ? ((e.corkedRequestsFree = n.next), (n.next = null))
          : (e.corkedRequestsFree = new pe(e));
    } else {
      for (; r; ) {
        var s = r.chunk,
          a = r.encoding,
          u = r.callback;
        if (
          (ae(t, e, !1, e.objectMode ? 1 : s.length, s, a, u),
          (r = r.next),
          e.writing)
        )
          break;
      }
      null === r && (e.lastBufferedRequest = null);
    }
    (e.bufferedRequestCount = 0),
      (e.bufferedRequest = r),
      (e.bufferProcessing = !1);
  }
  function fe(t) {
    return (
      t.ending &&
      0 === t.length &&
      null === t.bufferedRequest &&
      !t.finished &&
      !t.writing
    );
  }
  function ce(t, e) {
    e.prefinished || ((e.prefinished = !0), t.emit("prefinish"));
  }
  function le(t, e) {
    var r = fe(e);
    return (
      r &&
        (0 === e.pendingcb
          ? (ce(t, e), (e.finished = !0), t.emit("finish"))
          : ce(t, e)),
      r
    );
  }
  function pe(n) {
    var i = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function (t) {
        var e = i.entry;
        for (i.entry = null; e; ) {
          var r = e.callback;
          n.pendingcb--, r(t), (e = e.next);
        }
        n.corkedRequestsFree
          ? (n.corkedRequestsFree.next = i)
          : (n.corkedRequestsFree = i);
      });
  }
  (zt.prototype.read = function (t) {
    Yt("read", t), (t = parseInt(t, 10));
    var e = this._readableState,
      r = t;
    if (
      (0 !== t && (e.emittedReadable = !1),
      0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended))
    )
      return (
        Yt("read: emitReadable", e.length, e.ended),
        (0 === e.length && e.ended ? te : $t)(this),
        null
      );
    if (0 === (t = Ht(t, e)) && e.ended)
      return 0 === e.length && te(this), null;
    var n = e.needReadable;
    return (
      Yt("need readable", n),
      (0 === e.length || e.length - t < e.highWaterMark) &&
        Yt("length less than watermark", (n = !0)),
      e.ended || e.reading
        ? Yt("reading or ended", (n = !1))
        : n &&
          (Yt("do read"),
          (e.reading = !0),
          (e.sync = !0),
          0 === e.length && (e.needReadable = !0),
          this._read(e.highWaterMark),
          (e.sync = !1),
          e.reading || (t = Ht(r, e))),
      null === (n = 0 < t ? Xt(t, e) : null)
        ? ((e.needReadable = !0), (t = 0))
        : (e.length -= t),
      0 === e.length &&
        (e.ended || (e.needReadable = !0), r !== t && e.ended && te(this)),
      null !== n && this.emit("data", n),
      n
    );
  }),
    (zt.prototype._read = function (t) {
      this.emit("error", new Error("not implemented"));
    }),
    (zt.prototype.pipe = function (r, t) {
      var e = this,
        n = this._readableState;
      switch (n.pipesCount) {
        case 0:
          n.pipes = r;
          break;
        case 1:
          n.pipes = [n.pipes, r];
          break;
        default:
          n.pipes.push(r);
      }
      (n.pipesCount += 1), Yt("pipe count=%d opts=%j", n.pipesCount, t);
      t = !t || !1 !== t.end ? o : h;
      function i(t) {
        Yt("onunpipe"), t === e && h();
      }
      function o() {
        Yt("onend"), r.end();
      }
      n.endEmitted ? ht(t) : e.once("end", t), r.on("unpipe", i);
      var s,
        a =
          ((s = e),
          function () {
            var t = s._readableState;
            Yt("pipeOnDrain", t.awaitDrain),
              t.awaitDrain && t.awaitDrain--,
              0 === t.awaitDrain &&
                s.listeners("data").length &&
                ((t.flowing = !0), Zt(s));
          });
      r.on("drain", a);
      var u = !1;
      function h() {
        Yt("cleanup"),
          r.removeListener("close", p),
          r.removeListener("finish", d),
          r.removeListener("drain", a),
          r.removeListener("error", l),
          r.removeListener("unpipe", i),
          e.removeListener("end", o),
          e.removeListener("end", h),
          e.removeListener("data", c),
          (u = !0),
          !n.awaitDrain ||
            (r._writableState && !r._writableState.needDrain) ||
            a();
      }
      var f = !1;
      function c(t) {
        Yt("ondata"),
          (f = !1) !== r.write(t) ||
            f ||
            (((1 === n.pipesCount && n.pipes === r) ||
              (1 < n.pipesCount && -1 !== re(n.pipes, r))) &&
              !u &&
              (Yt("false write response, pause", e._readableState.awaitDrain),
              e._readableState.awaitDrain++,
              (f = !0)),
            e.pause());
      }
      function l(t) {
        var e;
        Yt("onerror", t),
          g(),
          r.removeListener("error", l),
          0 === ((e = "error"), r.listeners(e).length) && r.emit("error", t);
      }
      function p() {
        r.removeListener("finish", d), g();
      }
      function d() {
        Yt("onfinish"), r.removeListener("close", p), g();
      }
      function g() {
        Yt("unpipe"), e.unpipe(r);
      }
      return (
        e.on("data", c),
        (function (t, e, r) {
          if ("function" == typeof t.prependListener)
            return t.prependListener(e, r);
          t._events && t._events[e]
            ? Array.isArray(t._events[e])
              ? t._events[e].unshift(r)
              : (t._events[e] = [r, t._events[e]])
            : t.on(e, r);
        })(r, "error", l),
        r.once("close", p),
        r.once("finish", d),
        r.emit("pipe", e),
        n.flowing || (Yt("pipe resume"), e.resume()),
        r
      );
    }),
    (zt.prototype.unpipe = function (t) {
      var e = this._readableState;
      if (0 === e.pipesCount) return this;
      if (1 === e.pipesCount)
        return (
          (t && t !== e.pipes) ||
            ((t = t || e.pipes),
            (e.pipes = null),
            (e.pipesCount = 0),
            (e.flowing = !1),
            t && t.emit("unpipe", this)),
          this
        );
      if (!t) {
        var r = e.pipes,
          n = e.pipesCount;
        (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
        for (var i = 0; i < n; i++) r[i].emit("unpipe", this);
        return this;
      }
      var o = re(e.pipes, t);
      return (
        -1 === o ||
          (e.pipes.splice(o, 1),
          --e.pipesCount,
          1 === e.pipesCount && (e.pipes = e.pipes[0]),
          t.emit("unpipe", this)),
        this
      );
    }),
    (zt.prototype.addListener = zt.prototype.on = function (t, e) {
      e = f.prototype.on.call(this, t, e);
      return (
        "data" === t
          ? !1 !== this._readableState.flowing && this.resume()
          : "readable" === t &&
            ((t = this._readableState).endEmitted ||
              t.readableListening ||
              ((t.readableListening = t.needReadable = !0),
              (t.emittedReadable = !1),
              t.reading ? t.length && $t(this) : ht(Kt, this))),
        e
      );
    }),
    (zt.prototype.resume = function () {
      var t,
        e = this._readableState;
      return (
        e.flowing ||
          (Yt("resume"),
          (e.flowing = !0),
          (t = this),
          (e = e).resumeScheduled || ((e.resumeScheduled = !0), ht(Qt, t, e))),
        this
      );
    }),
    (zt.prototype.pause = function () {
      return (
        Yt("call pause flowing=%j", this._readableState.flowing),
        !1 !== this._readableState.flowing &&
          (Yt("pause"), (this._readableState.flowing = !1), this.emit("pause")),
        this
      );
    }),
    (zt.prototype.wrap = function (e) {
      var t,
        r = this._readableState,
        n = !1,
        i = this;
      for (t in (e.on("end", function () {
        var t;
        Yt("wrapped end"),
          !r.decoder ||
            r.ended ||
            ((t = r.decoder.end()) && t.length && i.push(t)),
          i.push(null);
      }),
      e.on("data", function (t) {
        Yt("wrapped data"),
          r.decoder && (t = r.decoder.write(t)),
          (r.objectMode && null == t) ||
            ((r.objectMode || (t && t.length)) &&
              (i.push(t) || ((n = !0), e.pause())));
      }),
      e))
        void 0 === this[t] &&
          "function" == typeof e[t] &&
          (this[t] = (function (t) {
            return function () {
              return e[t].apply(e, arguments);
            };
          })(t));
      return (
        (function (t, e) {
          for (var r = 0, n = t.length; r < n; r++) e(t[r], r);
        })(["error", "close", "destroy", "pause", "resume"], function (t) {
          e.on(t, i.emit.bind(i, t));
        }),
        (i._read = function (t) {
          Yt("wrapped _read", t), n && ((n = !1), e.resume());
        }),
        i
      );
    }),
    (zt._fromList = Xt),
    (se.WritableState = oe),
    pt(se, f),
    (oe.prototype.getBuffer = function () {
      for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next);
      return e;
    }),
    (se.prototype.pipe = function () {
      this.emit("error", new Error("Cannot pipe, not readable"));
    }),
    (se.prototype.write = function (t, e, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        h = this._writableState,
        f = !1;
      return (
        "function" == typeof e && ((r = e), (e = null)),
        (e = E.isBuffer(t) ? "buffer" : e || h.defaultEncoding),
        "function" != typeof r && (r = ne),
        h.ended
          ? ((s = this),
            (a = r),
            (u = new Error("write after end")),
            s.emit("error", u),
            ht(a, u))
          : ((n = this),
            (i = h),
            (o = r),
            (a = !(s = !0)),
            null === (u = t)
              ? (a = new TypeError("May not write null values to stream"))
              : E.isBuffer(u) ||
                "string" == typeof u ||
                void 0 === u ||
                i.objectMode ||
                (a = new TypeError("Invalid non-string/buffer chunk")),
            a && (n.emit("error", a), ht(o, a), (s = !1)),
            s &&
              (h.pendingcb++,
              (f = (function (t, e, r, n, i) {
                (r = (function (t, e, r) {
                  t.objectMode ||
                    !1 === t.decodeStrings ||
                    "string" != typeof e ||
                    (e = E.from(e, r));
                  return e;
                })(e, r, n)),
                  E.isBuffer(r) && (n = "buffer");
                var o = e.objectMode ? 1 : r.length;
                e.length += o;
                var s = e.length < e.highWaterMark;
                s || (e.needDrain = !0);
                {
                  var a;
                  e.writing || e.corked
                    ? ((a = e.lastBufferedRequest),
                      (e.lastBufferedRequest = new ie(r, n, i)),
                      a
                        ? (a.next = e.lastBufferedRequest)
                        : (e.bufferedRequest = e.lastBufferedRequest),
                      (e.bufferedRequestCount += 1))
                    : ae(t, e, !1, o, r, n, i);
                }
                return s;
              })(this, h, t, e, r)))),
        f
      );
    }),
    (se.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (se.prototype.uncork = function () {
      var t = this._writableState;
      t.corked &&
        (t.corked--,
        t.writing ||
          t.corked ||
          t.finished ||
          t.bufferProcessing ||
          !t.bufferedRequest ||
          he(this, t));
    }),
    (se.prototype.setDefaultEncoding = function (t) {
      if (
        ("string" == typeof t && (t = t.toLowerCase()),
        !(
          -1 <
          [
            "hex",
            "utf8",
            "utf-8",
            "ascii",
            "binary",
            "base64",
            "ucs2",
            "ucs-2",
            "utf16le",
            "utf-16le",
            "raw",
          ].indexOf((t + "").toLowerCase())
        ))
      )
        throw new TypeError("Unknown encoding: " + t);
      return (this._writableState.defaultEncoding = t), this;
    }),
    (se.prototype._write = function (t, e, r) {
      r(new Error("not implemented"));
    }),
    (se.prototype._writev = null),
    (se.prototype.end = function (t, e, r) {
      var n = this._writableState;
      "function" == typeof t
        ? ((r = t), (e = t = null))
        : "function" == typeof e && ((r = e), (e = null)),
        null != t && this.write(t, e),
        n.corked && ((n.corked = 1), this.uncork()),
        n.ending ||
          n.finished ||
          (function (t, e, r) {
            (e.ending = !0),
              le(t, e),
              r && (e.finished ? ht(r) : t.once("finish", r));
            (e.ended = !0), (t.writable = !1);
          })(this, n, r);
    }),
    pt(ve, zt);
  for (var de = Object.keys(se.prototype), ge = 0; ge < de.length; ge++) {
    var ye = de[ge];
    ve.prototype[ye] || (ve.prototype[ye] = se.prototype[ye]);
  }
  function ve(t) {
    if (!(this instanceof ve)) return new ve(t);
    zt.call(this, t),
      se.call(this, t),
      t && !1 === t.readable && (this.readable = !1),
      t && !1 === t.writable && (this.writable = !1),
      (this.allowHalfOpen = !0),
      t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1),
      this.once("end", be);
  }
  function be() {
    this.allowHalfOpen || this._writableState.ended || ht(we, this);
  }
  function we(t) {
    t.end();
  }
  function me(r) {
    (this.afterTransform = function (t, e) {
      return (function (t, e, r) {
        var n = t._transformState;
        n.transforming = !1;
        var i = n.writecb;
        if (!i)
          return t.emit("error", new Error("no writecb in Transform class"));
        (n.writechunk = null), (n.writecb = null) != r && t.push(r);
        i(e);
        e = t._readableState;
        (e.reading = !1),
          (e.needReadable || e.length < e.highWaterMark) &&
            t._read(e.highWaterMark);
      })(r, t, e);
    }),
      (this.needTransform = !1),
      (this.transforming = !1),
      (this.writecb = null),
      (this.writechunk = null),
      (this.writeencoding = null);
  }
  function _e(t) {
    if (!(this instanceof _e)) return new _e(t);
    ve.call(this, t), (this._transformState = new me(this));
    var e = this;
    (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      t &&
        ("function" == typeof t.transform && (this._transform = t.transform),
        "function" == typeof t.flush && (this._flush = t.flush)),
      this.once("prefinish", function () {
        "function" == typeof this._flush
          ? this._flush(function (t) {
              Se(e, t);
            })
          : Se(e);
      });
  }
  function Se(t, e) {
    if (e) return t.emit("error", e);
    var r = t._writableState,
      e = t._transformState;
    if (r.length) throw new Error("Calling transform done when ws.length != 0");
    if (e.transforming)
      throw new Error("Calling transform done when still transforming");
    return t.push(null);
  }
  function Ee(t) {
    if (!(this instanceof Ee)) return new Ee(t);
    _e.call(this, t);
  }
  function Re() {
    f.call(this);
  }
  function Ae(t) {
    return (Ae =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function ke(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function Te(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Oe(t, e, r) {
    return e && Te(t.prototype, e), r && Te(t, r), t;
  }
  function Le(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = r),
      t
    );
  }
  function Ce(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && Pe(t, e);
  }
  function je(t) {
    return (je = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function Pe(t, e) {
    return (Pe =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function Be(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e)
      ? (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t)
      : e;
  }
  function Me(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      Ue(t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  function xe(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) {
          for (var e = 0, r = new Array(t.length); e < t.length; e++)
            r[e] = t[e];
          return r;
        }
      })(t) ||
      Ue(t) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  function Ue(t) {
    if (
      Symbol.iterator in Object(t) ||
      "[object Arguments]" === Object.prototype.toString.call(t)
    )
      return Array.from(t);
  }
  pt(_e, ve),
    (_e.prototype.push = function (t, e) {
      return (
        (this._transformState.needTransform = !1),
        ve.prototype.push.call(this, t, e)
      );
    }),
    (_e.prototype._transform = function (t, e, r) {
      throw new Error("Not implemented");
    }),
    (_e.prototype._write = function (t, e, r) {
      var n = this._transformState;
      (n.writecb = r),
        (n.writechunk = t),
        (n.writeencoding = e),
        n.transforming ||
          ((e = this._readableState),
          (n.needTransform || e.needReadable || e.length < e.highWaterMark) &&
            this._read(e.highWaterMark));
    }),
    (_e.prototype._read = function (t) {
      var e = this._transformState;
      null !== e.writechunk && e.writecb && !e.transforming
        ? ((e.transforming = !0),
          this._transform(e.writechunk, e.writeencoding, e.afterTransform))
        : (e.needTransform = !0);
    }),
    pt(Ee, _e),
    (Ee.prototype._transform = function (t, e, r) {
      r(null, t);
    }),
    pt(Re, f),
    (Re.Readable = zt),
    (Re.Writable = se),
    (Re.Duplex = ve),
    (Re.Transform = _e),
    (Re.PassThrough = Ee),
    ((Re.Stream = Re).prototype.pipe = function (e, t) {
      var r = this;
      function n(t) {
        e.writable && !1 === e.write(t) && r.pause && r.pause();
      }
      function i() {
        r.readable && r.resume && r.resume();
      }
      r.on("data", n),
        e.on("drain", i),
        e._isStdio || (t && !1 === t.end) || (r.on("end", s), r.on("close", a));
      var o = !1;
      function s() {
        o || ((o = !0), e.end());
      }
      function a() {
        o || ((o = !0), "function" == typeof e.destroy && e.destroy());
      }
      function u(t) {
        if ((h(), 0 === f.listenerCount(this, "error"))) throw t;
      }
      function h() {
        r.removeListener("data", n),
          e.removeListener("drain", i),
          r.removeListener("end", s),
          r.removeListener("close", a),
          r.removeListener("error", u),
          e.removeListener("error", u),
          r.removeListener("end", h),
          r.removeListener("close", h),
          e.removeListener("close", h);
      }
      return (
        r.on("error", u),
        e.on("error", u),
        r.on("end", h),
        r.on("close", h),
        e.on("close", h),
        e.emit("pipe", r),
        e
      );
    });
  var Ie = "\n",
    De =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    Ne = "Expected a function",
    qe = "__lodash_hash_undefined__",
    Ye = 1 / 0,
    Fe = "[object Function]",
    ze = "[object GeneratorFunction]",
    We = "[object Symbol]",
    Je = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    He = /^\w*$/,
    $e = /^\./,
    Ge = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    Ve = /\\(\\)?/g,
    Ke = /^\[object .+?Constructor\]$/,
    Qe = "object" == typeof De && De && De.Object === Object && De,
    Ze = "object" == typeof self && self && self.Object === Object && self,
    ct = Qe || Ze || Function("return this")();
  var lt = Array.prototype,
    pt = Function.prototype,
    De = Object.prototype,
    Qe = ct["__core-js_shared__"],
    Xe = (Ze = /[^.]+$/.exec((Qe && Qe.keys && Qe.keys.IE_PROTO) || ""))
      ? "Symbol(src)_1." + Ze
      : "",
    tr = pt.toString,
    er = De.hasOwnProperty,
    rr = De.toString,
    nr = RegExp(
      "^" +
        tr
          .call(er)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    Qe = ct.Symbol,
    ir = lt.splice,
    or = gr(ct, "Map"),
    sr = gr(Object, "create"),
    Ze = Qe ? Qe.prototype : void 0,
    ar = Ze ? Ze.toString : void 0;
  function ur(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function hr(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function fr(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function cr(t, e) {
    for (var r, n, i = t.length; i--; )
      if ((r = t[i][0]) === (n = e) || (r != r && n != n)) return i;
    return -1;
  }
  function lr(t, e) {
    for (
      var r,
        n = 0,
        i = (e = (function (t, e) {
          if (br(t)) return !1;
          var r = typeof t;
          if (
            "number" == r ||
            "symbol" == r ||
            "boolean" == r ||
            null == t ||
            mr(t)
          )
            return !0;
          return He.test(t) || !Je.test(t) || (null != e && (t in Object(e)));
        })(e, t)
          ? [e]
          : br((r = e))
          ? r
          : yr(r)).length;
      null != t && n < i;

    )
      t =
        t[
          (function (t) {
            if ("string" == typeof t || mr(t)) return t;
            var e = t + "";
            return "0" == e && 1 / t == -Ye ? "-0" : e;
          })(e[n++])
        ];
    return n && n == i ? t : void 0;
  }
  function pr(t) {
    var e;
    return (
      wr(t) &&
      ((e = t), !(Xe && Xe in e)) &&
      ((function (t) {
        t = wr(t) ? rr.call(t) : "";
        return t == Fe || t == ze;
      })(t) ||
      (function (t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString)
          try {
            e = !!(t + "");
          } catch (t) {}
        return e;
      })(t)
        ? nr
        : Ke
      ).test(
        (function (t) {
          if (null != t) {
            try {
              return tr.call(t);
            } catch (t) {}
            try {
              return t + "";
            } catch (t) {}
          }
          return "";
        })(t)
      )
    );
  }
  function dr(t, e) {
    var r,
      n = t.__data__;
    return (
      "string" == (t = typeof (r = e)) ||
      "number" == t ||
      "symbol" == t ||
      "boolean" == t
        ? "__proto__" !== r
        : null === r
    )
      ? n["string" == typeof e ? "string" : "hash"]
      : n.map;
  }
  function gr(t, e) {
    (e = e), (e = null == (t = t) ? void 0 : t[e]);
    return pr(e) ? e : void 0;
  }
  (ur.prototype.clear = function () {
    this.__data__ = sr ? sr(null) : {};
  }),
    (ur.prototype.delete = function (t) {
      return this.has(t) && delete this.__data__[t];
    }),
    (ur.prototype.get = function (t) {
      var e = this.__data__;
      if (sr) {
        var r = e[t];
        return r === qe ? void 0 : r;
      }
      return er.call(e, t) ? e[t] : void 0;
    }),
    (ur.prototype.has = function (t) {
      var e = this.__data__;
      return sr ? void 0 !== e[t] : er.call(e, t);
    }),
    (ur.prototype.set = function (t, e) {
      return (this.__data__[t] = sr && void 0 === e ? qe : e), this;
    }),
    (hr.prototype.clear = function () {
      this.__data__ = [];
    }),
    (hr.prototype.delete = function (t) {
      var e = this.__data__;
      return (
        !((t = cr(e, t)) < 0) &&
        (t == e.length - 1 ? e.pop() : ir.call(e, t, 1), !0)
      );
    }),
    (hr.prototype.get = function (t) {
      var e = this.__data__;
      return (t = cr(e, t)) < 0 ? void 0 : e[t][1];
    }),
    (hr.prototype.has = function (t) {
      return -1 < cr(this.__data__, t);
    }),
    (hr.prototype.set = function (t, e) {
      var r = this.__data__,
        n = cr(r, t);
      return n < 0 ? r.push([t, e]) : (r[n][1] = e), this;
    }),
    (fr.prototype.clear = function () {
      this.__data__ = {
        hash: new ur(),
        map: new (or || hr)(),
        string: new ur(),
      };
    }),
    (fr.prototype.delete = function (t) {
      return dr(this, t).delete(t);
    }),
    (fr.prototype.get = function (t) {
      return dr(this, t).get(t);
    }),
    (fr.prototype.has = function (t) {
      return dr(this, t).has(t);
    }),
    (fr.prototype.set = function (t, e) {
      return dr(this, t).set(t, e), this;
    });
  var yr = vr(function (t) {
    var e;
    t =
      null == (e = t)
        ? ""
        : (function (t) {
            if ("string" == typeof t) return t;
            if (mr(t)) return ar ? ar.call(t) : "";
            var e = t + "";
            return "0" == e && 1 / t == -Ye ? "-0" : e;
          })(e);
    var i = [];
    return (
      $e.test(t) && i.push(""),
      t.replace(Ge, function (t, e, r, n) {
        i.push(r ? n.replace(Ve, "$1") : e || t);
      }),
      i
    );
  });
  function vr(n, i) {
    if ("function" != typeof n || (i && "function" != typeof i))
      throw new TypeError(Ne);
    var o = function () {
      var t = arguments,
        e = i ? i.apply(this, t) : t[0],
        r = o.cache;
      if (r.has(e)) return r.get(e);
      t = n.apply(this, t);
      return (o.cache = r.set(e, t)), t;
    };
    return (o.cache = new (vr.Cache || fr)()), o;
  }
  vr.Cache = fr;
  var br = Array.isArray;
  function wr(t) {
    var e = typeof t;
    return t && ("object" == e || "function" == e);
  }
  function mr(t) {
    return (
      "symbol" == typeof t ||
      (!!(e = t) && "object" == typeof e && rr.call(t) == We)
    );
    var e;
  }
  var _r = function (t, e, r) {
    return void 0 === (e = null == t ? void 0 : lr(t, e)) ? r : e;
  };
  var pt = function t(e, r, n) {
      var i = Array.isArray(r) ? r : r.split("."),
        o = Me(i),
        r = o[0],
        o = o.slice(1),
        n = 1 < i.length ? t(e[r] || {}, o, n) : n;
      return Object.assign({}, e, Le({}, r, n));
    },
    De = function t(r, e) {
      var n = Array.isArray(e) ? e : e.split("."),
        e = Me(n),
        i = e[0],
        e = e.slice(1);
      return "object" !== Ae(r[i])
        ? r
        : 1 === n.length
        ? Object.keys(r)
            .filter(function (t) {
              return t !== i;
            })
            .reduce(function (t, e) {
              return Object.assign(t, Le({}, e, r[e]));
            }, {})
        : t(r[i], e);
    },
    lt = function (t, r) {
      var n = !0;
      return t.reduce(function (t, e) {
        return (
          null == e && (e = ""),
          n ? ((n = !1), "".concat(e)) : "".concat(t).concat(r).concat(e)
        );
      }, "");
    },
    ct = function (e, r) {
      try {
        return e.push.apply(e, xe(r)), e;
      } catch (t) {
        return e.concat(r);
      }
    },
    Sr = function (t, e, r) {
      return void 0 === t[e] ? r : t[e];
    },
    Er = lt,
    Rr = ct,
    Ar = (function () {
      function e(t) {
        ke(this, e), (this.opts = this.preprocessOpts(t));
      }
      return (
        Oe(e, [
          {
            key: "preprocessOpts",
            value: function (t) {
              t = Object.assign({}, t);
              return (
                (t.transforms = Array.isArray(t.transforms)
                  ? t.transforms
                  : t.transforms
                  ? [t.transforms]
                  : []),
                (t.delimiter = t.delimiter || ","),
                (t.eol = t.eol || Ie),
                (t.quote = "string" == typeof t.quote ? t.quote : '"'),
                (t.escapedQuote =
                  "string" == typeof t.escapedQuote
                    ? t.escapedQuote
                    : "".concat(t.quote).concat(t.quote)),
                (t.header = !1 !== t.header),
                (t.includeEmptyRows = t.includeEmptyRows || !1),
                (t.withBOM = t.withBOM || !1),
                t
              );
            },
          },
          {
            key: "preprocessFieldsInfo",
            value: function (t) {
              var e = this;
              return t.map(function (r) {
                if ("string" == typeof r)
                  return {
                    label: r,
                    value:
                      r.includes(".") || r.includes("[")
                        ? function (t) {
                            return _r(t, r, e.opts.defaultValue);
                          }
                        : function (t) {
                            return Sr(t, r, e.opts.defaultValue);
                          },
                  };
                if ("object" === Ae(r)) {
                  var n = "default" in r ? r.default : e.opts.defaultValue;
                  if ("string" == typeof r.value)
                    return {
                      label: r.label || r.value,
                      value:
                        r.value.includes(".") || r.value.includes("[")
                          ? function (t) {
                              return _r(t, r.value, n);
                            }
                          : function (t) {
                              return Sr(t, r.value, n);
                            },
                    };
                  if ("function" == typeof r.value) {
                    var t = r.label || r.value.name || "",
                      i = { label: t, default: n };
                    return {
                      label: t,
                      value: function (t) {
                        var e = r.value(t, i);
                        return null == e ? n : e;
                      },
                    };
                  }
                }
                throw new Error(
                  "Invalid field info option. " + JSON.stringify(r)
                );
              });
            },
          },
          {
            key: "getHeader",
            value: function () {
              var e = this;
              return Er(
                this.opts.fields.map(function (t) {
                  return e.processValue(t.label);
                }),
                this.opts.delimiter
              );
            },
          },
          {
            key: "preprocessRow",
            value: function (t) {
              return this.opts.transforms.reduce(
                function (t, e) {
                  return t
                    .map(function (t) {
                      return e(t);
                    })
                    .reduce(Rr, []);
                },
                [t]
              );
            },
          },
          {
            key: "processRow",
            value: function (e) {
              var r = this;
              if (e) {
                var t = this.opts.fields.map(function (t) {
                  return r.processCell(e, t);
                });
                if (
                  this.opts.includeEmptyRows ||
                  !t.every(function (t) {
                    return void 0 === t;
                  })
                )
                  return Er(t, this.opts.delimiter);
              }
            },
          },
          {
            key: "processCell",
            value: function (t, e) {
              return this.processValue(e.value(t));
            },
          },
          {
            key: "processValue",
            value: function (t) {
              if (null != t) {
                var e = Ae(t);
                if ("boolean" !== e && "number" !== e && "string" !== e) {
                  if (void 0 === (t = JSON.stringify(t))) return;
                  '"' === t[0] && (t = t.replace(/^"(.+)"$/, "$1"));
                }
                return (
                  "string" == typeof t &&
                    (t.includes(this.opts.quote) &&
                      (t = t.replace(
                        new RegExp(this.opts.quote, "g"),
                        this.opts.escapedQuote
                      )),
                    (t = ""
                      .concat(this.opts.quote)
                      .concat(t)
                      .concat(this.opts.quote)),
                    this.opts.excelStrings && (t = '"="'.concat(t, '""'))),
                  t
                );
              }
            },
          },
        ]),
        e
      );
    })(),
    kr = lt,
    Tr = ct,
    Or = (function () {
      function e(t) {
        return (
          ke(this, e),
          (t = Be(this, je(e).call(this, t))).opts.fields &&
            (t.opts.fields = t.preprocessFieldsInfo(t.opts.fields)),
          t
        );
      }
      return (
        Ce(e, Ar),
        Oe(e, [
          {
            key: "parse",
            value: function (t) {
              var e = this.preprocessData(t);
              this.opts.fields ||
                ((this.opts.fields = e.reduce(function (e, t) {
                  return (
                    Object.keys(t).forEach(function (t) {
                      e.includes(t) || e.push(t);
                    }),
                    e
                  );
                }, [])),
                (this.opts.fields = this.preprocessFieldsInfo(
                  this.opts.fields
                )));
              (t = this.opts.header ? this.getHeader() : ""),
                (e = this.processData(e));
              return (
                (this.opts.withBOM ? "\ufeff" : "") +
                t +
                (t && e ? this.opts.eol : "") +
                e
              );
            },
          },
          {
            key: "preprocessData",
            value: function (t) {
              var e = this,
                t = Array.isArray(t) ? t : [t];
              if (
                !this.opts.fields &&
                (0 === t.length || "object" !== Ae(t[0]))
              )
                throw new Error(
                  'Data should not be empty or the "fields" option should be included'
                );
              return 0 === this.opts.transforms.length
                ? t
                : t
                    .map(function (t) {
                      return e.preprocessRow(t);
                    })
                    .reduce(Tr, []);
            },
          },
          {
            key: "processData",
            value: function (t) {
              var e = this;
              return kr(
                t
                  .map(function (t) {
                    return e.processRow(t);
                  })
                  .filter(function (t) {
                    return t;
                  }),
                this.opts.eol
              );
            },
          },
        ]),
        e
      );
    })(),
    Lr = {},
    Cr =
      ((Lr.LEFT_BRACE = 1),
      (Lr.RIGHT_BRACE = 2),
      (Lr.LEFT_BRACKET = 3),
      (Lr.RIGHT_BRACKET = 4),
      (Lr.COLON = 5),
      (Lr.COMMA = 6),
      (Lr.TRUE = 7),
      (Lr.FALSE = 8),
      (Lr.NULL = 9),
      (Lr.STRING = 10),
      (Lr.NUMBER = 11),
      (Lr.START = 17),
      (Lr.STOP = 18),
      (Lr.TRUE1 = 33),
      (Lr.TRUE2 = 34),
      (Lr.TRUE3 = 35),
      (Lr.FALSE1 = 49),
      (Lr.FALSE2 = 50),
      (Lr.FALSE3 = 51),
      (Lr.FALSE4 = 52),
      (Lr.NULL1 = 65),
      (Lr.NULL2 = 66),
      (Lr.NULL3 = 67),
      (Lr.NUMBER1 = 81),
      (Lr.NUMBER3 = 83),
      (Lr.STRING1 = 97),
      (Lr.STRING2 = 98),
      (Lr.STRING3 = 99),
      (Lr.STRING4 = 100),
      (Lr.STRING5 = 101),
      (Lr.STRING6 = 102),
      (Lr.VALUE = 113),
      (Lr.KEY = 114),
      (Lr.OBJECT = 129),
      (Lr.ARRAY = 130),
      "\\".charCodeAt(0)),
    jr = "/".charCodeAt(0),
    Pr = "\b".charCodeAt(0),
    Br = "\f".charCodeAt(0),
    Mr = "\n".charCodeAt(0),
    xr = "\r".charCodeAt(0),
    Ur = "\t".charCodeAt(0),
    Ir = 65536;
  function Dr() {
    (this.tState = 17),
      (this.value = void 0),
      (this.string = void 0),
      (this.stringBuffer = E.alloc ? E.alloc(Ir) : new E(Ir)),
      (this.stringBufferOffset = 0),
      (this.unicode = void 0),
      (this.highSurrogate = void 0),
      (this.key = void 0),
      (this.mode = void 0),
      (this.stack = []),
      (this.state = 113),
      (this.bytes_remaining = 0),
      (this.bytes_in_sequence = 0),
      (this.temp_buffs = { 2: new E(2), 3: new E(3), 4: new E(4) }),
      (this.offset = -1);
  }
  Dr.toknam = function (t) {
    for (var e = Object.keys(Lr), r = 0, n = e.length; r < n; r++) {
      var i = e[r];
      if (Lr[i] === t) return i;
    }
    return t && "0x" + t.toString(16);
  };
  Qe = Dr.prototype;
  (Qe.onError = function (t) {
    throw t;
  }),
    (Qe.charError = function (t, e) {
      (this.tState = 18),
        this.onError(
          new Error(
            "Unexpected " +
              JSON.stringify(String.fromCharCode(t[e])) +
              " at position " +
              e +
              " in state " +
              Dr.toknam(this.tState)
          )
        );
    }),
    (Qe.appendStringChar = function (t) {
      this.stringBufferOffset >= Ir &&
        ((this.string += this.stringBuffer.toString("utf8")),
        (this.stringBufferOffset = 0)),
        (this.stringBuffer[this.stringBufferOffset++] = t);
    }),
    (Qe.appendStringBuf = function (t, e, r) {
      var n = t.length;
      "number" == typeof e &&
        (n =
          "number" == typeof r
            ? r < 0
              ? t.length - e + r
              : r - e
            : t.length - e),
        n < 0 && (n = 0),
        this.stringBufferOffset + n > Ir &&
          ((this.string += this.stringBuffer.toString(
            "utf8",
            0,
            this.stringBufferOffset
          )),
          (this.stringBufferOffset = 0)),
        t.copy(this.stringBuffer, this.stringBufferOffset, e, r),
        (this.stringBufferOffset += n);
    }),
    (Qe.write = function (t) {
      var e;
      "string" == typeof t && (t = new E(t));
      for (var r = 0, n = t.length; r < n; r++)
        if (17 === this.tState) {
          if (((e = t[r]), this.offset++, 123 === e)) this.onToken(1, "{");
          else if (125 === e) this.onToken(2, "}");
          else if (91 === e) this.onToken(3, "[");
          else if (93 === e) this.onToken(4, "]");
          else if (58 === e) this.onToken(5, ":");
          else if (44 === e) this.onToken(6, ",");
          else if (116 === e) this.tState = 33;
          else if (102 === e) this.tState = 49;
          else if (110 === e) this.tState = 65;
          else if (34 === e)
            (this.string = ""),
              (this.stringBufferOffset = 0),
              (this.tState = 97);
          else if (45 === e) (this.string = "-"), (this.tState = 81);
          else if (48 <= e && e < 64)
            (this.string = String.fromCharCode(e)), (this.tState = 83);
          else if (32 !== e && 9 !== e && 10 !== e && 13 !== e)
            return this.charError(t, r);
        } else if (97 === this.tState)
          if (((e = t[r]), 0 < this.bytes_remaining)) {
            for (var i = 0; i < this.bytes_remaining; i++)
              this.temp_buffs[this.bytes_in_sequence][
                this.bytes_in_sequence - this.bytes_remaining + i
              ] = t[i];
            this.appendStringBuf(this.temp_buffs[this.bytes_in_sequence]),
              (this.bytes_in_sequence = this.bytes_remaining = 0),
              (r = r + i - 1);
          } else if (0 === this.bytes_remaining && 128 <= e) {
            if (e <= 193 || 244 < e)
              return this.onError(
                new Error(
                  "Invalid UTF-8 character at position " +
                    r +
                    " in state " +
                    Dr.toknam(this.tState)
                )
              );
            if (
              (194 <= e && e <= 223 && (this.bytes_in_sequence = 2),
              224 <= e && e <= 239 && (this.bytes_in_sequence = 3),
              240 <= e && e <= 244 && (this.bytes_in_sequence = 4),
              this.bytes_in_sequence + r > t.length)
            ) {
              for (var o = 0; o <= t.length - 1 - r; o++)
                this.temp_buffs[this.bytes_in_sequence][o] = t[r + o];
              (this.bytes_remaining = r + this.bytes_in_sequence - t.length),
                (r = t.length - 1);
            } else
              this.appendStringBuf(t, r, r + this.bytes_in_sequence),
                (r = r + this.bytes_in_sequence - 1);
          } else if (34 === e)
            (this.tState = 17),
              (this.string += this.stringBuffer.toString(
                "utf8",
                0,
                this.stringBufferOffset
              )),
              (this.stringBufferOffset = 0),
              this.onToken(10, this.string),
              (this.offset += E.byteLength(this.string, "utf8") + 1),
              (this.string = void 0);
          else if (92 === e) this.tState = 98;
          else {
            if (!(32 <= e)) return this.charError(t, r);
            this.appendStringChar(e);
          }
        else if (98 === this.tState)
          if (34 === (e = t[r])) this.appendStringChar(e), (this.tState = 97);
          else if (92 === e) this.appendStringChar(Cr), (this.tState = 97);
          else if (47 === e) this.appendStringChar(jr), (this.tState = 97);
          else if (98 === e) this.appendStringChar(Pr), (this.tState = 97);
          else if (102 === e) this.appendStringChar(Br), (this.tState = 97);
          else if (110 === e) this.appendStringChar(Mr), (this.tState = 97);
          else if (114 === e) this.appendStringChar(xr), (this.tState = 97);
          else if (116 === e) this.appendStringChar(Ur), (this.tState = 97);
          else {
            if (117 !== e) return this.charError(t, r);
            (this.unicode = ""), (this.tState = 99);
          }
        else if (
          99 === this.tState ||
          100 === this.tState ||
          101 === this.tState ||
          102 === this.tState
        ) {
          if (
            !(
              (48 <= (e = t[r]) && e < 64) ||
              (64 < e && e <= 70) ||
              (96 < e && e <= 102)
            )
          )
            return this.charError(t, r);
          (this.unicode += String.fromCharCode(e)),
            102 == this.tState++ &&
              ((s = parseInt(this.unicode, 16)),
              (this.unicode = void 0) !== this.highSurrogate &&
              56320 <= s &&
              s < 57344
                ? (this.appendStringBuf(
                    new E(String.fromCharCode(this.highSurrogate, s))
                  ),
                  (this.highSurrogate = void 0))
                : void 0 === this.highSurrogate && 55296 <= s && s < 56320
                ? (this.highSurrogate = s)
                : (void 0 !== this.highSurrogate &&
                    (this.appendStringBuf(
                      new E(String.fromCharCode(this.highSurrogate))
                    ),
                    (this.highSurrogate = void 0)),
                  this.appendStringBuf(new E(String.fromCharCode(s)))),
              (this.tState = 97));
        } else if (81 === this.tState || 83 === this.tState)
          switch ((e = t[r])) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 46:
            case 101:
            case 69:
            case 43:
            case 45:
              (this.string += String.fromCharCode(e)), (this.tState = 83);
              break;
            default:
              this.tState = 17;
              var s = Number(this.string);
              if (isNaN(s)) return this.charError(t, r);
              this.string.match(/[0-9]+/) == this.string &&
              s.toString() != this.string
                ? this.onToken(10, this.string)
                : this.onToken(11, s),
                (this.offset += this.string.length - 1),
                (this.string = void 0),
                r--;
          }
        else if (33 === this.tState) {
          if (114 !== t[r]) return this.charError(t, r);
          this.tState = 34;
        } else if (34 === this.tState) {
          if (117 !== t[r]) return this.charError(t, r);
          this.tState = 35;
        } else if (35 === this.tState) {
          if (101 !== t[r]) return this.charError(t, r);
          (this.tState = 17), this.onToken(7, !0), (this.offset += 3);
        } else if (49 === this.tState) {
          if (97 !== t[r]) return this.charError(t, r);
          this.tState = 50;
        } else if (50 === this.tState) {
          if (108 !== t[r]) return this.charError(t, r);
          this.tState = 51;
        } else if (51 === this.tState) {
          if (115 !== t[r]) return this.charError(t, r);
          this.tState = 52;
        } else if (52 === this.tState) {
          if (101 !== t[r]) return this.charError(t, r);
          (this.tState = 17), this.onToken(8, !1), (this.offset += 4);
        } else if (65 === this.tState) {
          if (117 !== t[r]) return this.charError(t, r);
          this.tState = 66;
        } else if (66 === this.tState) {
          if (108 !== t[r]) return this.charError(t, r);
          this.tState = 67;
        } else if (67 === this.tState) {
          if (108 !== t[r]) return this.charError(t, r);
          (this.tState = 17), this.onToken(9, null), (this.offset += 3);
        }
    }),
    (Qe.onToken = function (t, e) {}),
    (Qe.parseError = function (t, e) {
      (this.tState = 18),
        this.onError(
          new Error(
            "Unexpected " +
              Dr.toknam(t) +
              (e ? "(" + JSON.stringify(e) + ")" : "") +
              " in state " +
              Dr.toknam(this.state)
          )
        );
    }),
    (Qe.push = function () {
      this.stack.push({ value: this.value, key: this.key, mode: this.mode });
    }),
    (Qe.pop = function () {
      var t = this.value,
        e = this.stack.pop();
      (this.value = e.value),
        (this.key = e.key),
        (this.mode = e.mode),
        this.emit(t),
        this.mode || (this.state = 113);
    }),
    (Qe.emit = function (t) {
      this.mode && (this.state = 6), this.onValue(t);
    }),
    (Qe.onValue = function (t) {}),
    (Qe.onToken = function (t, e) {
      if (113 === this.state)
        if (10 === t || 11 === t || 7 === t || 8 === t || 9 === t)
          this.value && (this.value[this.key] = e), this.emit(e);
        else if (1 === t)
          this.push(),
            this.value
              ? (this.value = this.value[this.key] = {})
              : (this.value = {}),
            (this.key = void 0),
            (this.state = 114),
            (this.mode = 129);
        else if (3 === t)
          this.push(),
            this.value
              ? (this.value = this.value[this.key] = [])
              : (this.value = []),
            (this.key = 0),
            (this.mode = 130),
            (this.state = 113);
        else if (2 === t) {
          if (129 !== this.mode) return this.parseError(t, e);
          this.pop();
        } else {
          if (4 !== t) return this.parseError(t, e);
          {
            if (130 !== this.mode) return this.parseError(t, e);
            this.pop();
          }
        }
      else if (114 === this.state)
        if (10 === t) (this.key = e), (this.state = 5);
        else {
          if (2 !== t) return this.parseError(t, e);
          this.pop();
        }
      else if (5 === this.state) {
        if (5 !== t) return this.parseError(t, e);
        this.state = 113;
      } else {
        if (6 !== this.state) return this.parseError(t, e);
        if (6 === t)
          130 === this.mode
            ? (this.key++, (this.state = 113))
            : 129 === this.mode && (this.state = 114);
        else {
          if (
            !((4 === t && 130 === this.mode) || (2 === t && 129 === this.mode))
          )
            return this.parseError(t, e);
          this.pop();
        }
      }
    }),
    (Dr.C = Lr);
  var Nr = Dr,
    qr = Re.Transform,
    Yr = (function () {
      function n(t, e) {
        var r;
        return (
          ke(this, n),
          (r = Be(this, je(n).call(this, e))),
          Object.getOwnPropertyNames(Ar.prototype).forEach(function (t) {
            return (r[t] = Ar.prototype[t]);
          }),
          (r.opts = r.preprocessOpts(t)),
          (r._data = ""),
          (r._hasWritten = !1),
          r._readableState.objectMode
            ? r.initObjectModeParse()
            : r.opts.ndjson
            ? r.initNDJSONParse()
            : r.initJSONParser(),
          r.opts.withBOM && r.push("\ufeff"),
          r.opts.fields &&
            ((r.opts.fields = r.preprocessFieldsInfo(r.opts.fields)),
            r.pushHeader()),
          r
        );
      }
      return (
        Ce(n, qr),
        Oe(n, [
          {
            key: "initObjectModeParse",
            value: function () {
              var e = this;
              this.parser = {
                write: function (t) {
                  e.pushLine(t);
                },
                getPendingData: function () {},
              };
            },
          },
          {
            key: "initNDJSONParse",
            value: function () {
              var o = this;
              this.parser = {
                _data: "",
                write: function (t) {
                  this._data += t.toString();
                  var n = this._data
                      .split("\n")
                      .map(function (t) {
                        return t.trim();
                      })
                      .filter(function (t) {
                        return "" !== t;
                      }),
                    i = !1;
                  n.forEach(function (e, r) {
                    try {
                      o.pushLine(JSON.parse(e));
                    } catch (t) {
                      r === n.length - 1
                        ? (i = !0)
                        : ((t.message = "Invalid JSON (".concat(e, ")")),
                          o.emit("error", t));
                    }
                  }),
                    (this._data = i
                      ? this._data.slice(this._data.lastIndexOf("\n"))
                      : "");
                },
                getPendingData: function () {
                  return this._data;
                },
              };
            },
          },
          {
            key: "initJSONParser",
            value: function () {
              var r = this;
              (this.parser = new Nr()),
                (this.parser.onValue = function (t) {
                  this.stack.length === this.depthToEmit && r.pushLine(t);
                }),
                (this.parser._onToken = this.parser.onToken),
                (this.parser.onToken = function (t, e) {
                  r.parser._onToken(t, e),
                    0 !== this.stack.length ||
                      r.opts.fields ||
                      this.mode === Nr.C.ARRAY ||
                      this.mode === Nr.C.OBJECT ||
                      this.onError(
                        new Error(
                          'Data should not be empty or the "fields" option should be included'
                        )
                      ),
                    1 === this.stack.length &&
                      (void 0 === this.depthToEmit &&
                        (this.depthToEmit = this.mode === Nr.C.ARRAY ? 1 : 0),
                      0 !== this.depthToEmit &&
                        1 === this.stack.length &&
                        (this.value = void 0));
                }),
                (this.parser.getPendingData = function () {
                  return this.value;
                }),
                (this.parser.onError = function (t) {
                  t.message.includes("Unexpected") &&
                    (t.message = "Invalid JSON (".concat(t.message, ")")),
                    r.emit("error", t);
                });
            },
          },
          {
            key: "_transform",
            value: function (t, e, r) {
              this.parser.write(t), r();
            },
          },
          {
            key: "_flush",
            value: function (t) {
              this.parser.getPendingData() &&
                t(
                  new Error(
                    "Invalid data received from stdin",
                    this.parser.getPendingData()
                  )
                ),
                t();
            },
          },
          {
            key: "pushHeader",
            value: function () {
              var t;
              this.opts.header &&
                ((t = this.getHeader()),
                this.emit("header", t),
                this.push(t),
                (this._hasWritten = !0));
            },
          },
          {
            key: "pushLine",
            value: function (t) {
              var e = this,
                t = this.preprocessRow(t);
              this._hasWritten ||
                ((this.opts.fields =
                  this.opts.fields ||
                  this.preprocessFieldsInfo(Object.keys(t[0]))),
                this.pushHeader()),
                t.forEach(function (t) {
                  t = e.processRow(t, e.opts);
                  void 0 !== t &&
                    (e.emit("line", t),
                    e.push(e._hasWritten ? e.opts.eol + t : t),
                    (e._hasWritten = !0));
                });
            },
          },
        ]),
        n
      );
    })(),
    Fr = Re.Transform,
    zr = lt,
    Wr = (function () {
      function r(t, e) {
        ke(this, r),
          (this.input = new Fr(e)),
          (this.input._read = function () {}),
          (this.transform = new Yr(t, e)),
          (this.processor = this.input.pipe(this.transform));
      }
      return (
        Oe(r, [
          {
            key: "fromInput",
            value: function (t) {
              if (this._input)
                throw new Error("Async parser already has an input.");
              return (
                (this._input = t),
                (this.input = this._input.pipe(this.processor)),
                this
              );
            },
          },
          {
            key: "throughTransform",
            value: function (t) {
              if (this._output)
                throw new Error(
                  "Can't add transforms once an output has been added."
                );
              return (this.processor = this.processor.pipe(t)), this;
            },
          },
          {
            key: "toOutput",
            value: function (t) {
              if (this._output)
                throw new Error("Async parser already has an output.");
              return (
                (this._output = t),
                (this.processor = this.processor.pipe(t)),
                this
              );
            },
          },
          {
            key: "promise",
            value: function (t) {
              var n = this,
                i = !(0 < arguments.length && void 0 !== t) || t;
              return new Promise(function (t, e) {
                var r;
                i
                  ? ((r = []),
                    n.processor
                      .on("data", function (t) {
                        return r.push(t.toString());
                      })
                      .on("finish", function () {
                        return t(zr(r, ""));
                      })
                      .on("error", function (t) {
                        return e(t);
                      }))
                  : n.processor
                      .on("finish", function () {
                        return t();
                      })
                      .on("error", function (t) {
                        return e(t);
                      });
              });
            },
          },
        ]),
        r
      );
    })();
  var Jr = pt,
    Hr = De,
    $r = ct;
  var Gr = Re.Readable,
    Ze = Or,
    Qe = Yr,
    lt = function (t, e) {
      return new Or(e).parse(t);
    },
    pt = function (t, e, r) {
      try {
        t instanceof Gr || (r = Object.assign({}, r, { objectMode: !0 }));
        var n = new Wr(e, r),
          i = n.promise();
        return (
          Array.isArray(t)
            ? (t.forEach(function (t) {
                return n.input.push(t);
              }),
              n.input.push(null))
            : t instanceof Gr
            ? n.fromInput(t)
            : (n.input.push(t), n.input.push(null)),
          i
        );
      } catch (t) {
        return Promise.reject(t);
      }
    },
    De = {
      flatten: function () {
        var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.objects,
          s = void 0 === e || e,
          a = void 0 !== (e = t.arrays) && e,
          u = void 0 === (t = t.separator) ? "." : t;
        return function (t) {
          return (function r(n, i, o) {
            return (
              Object.keys(n).forEach(function (t) {
                var e = o ? "".concat(o).concat(u).concat(t) : t,
                  t = n[t];
                (s &&
                  "object" === Ae(t) &&
                  null !== t &&
                  !Array.isArray(t) &&
                  "[object Function]" !==
                    Object.prototype.toString.call(t.toJSON) &&
                  Object.keys(t).length) ||
                (a && Array.isArray(t))
                  ? r(t, i, e)
                  : (i[e] = t);
              }),
              i
            );
          })(t, {});
        };
      },
      unwind: function () {
        var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.paths,
          r = void 0 === e ? void 0 : e,
          i = void 0 !== (t = t.blankOut) && t;
        function n(t, n) {
          return t
            .map(function (r) {
              var t = _r(r, n);
              return Array.isArray(t)
                ? t.length
                  ? t.map(function (t, e) {
                      return Jr(i && 0 < e ? {} : r, n, t);
                    })
                  : Hr(r, n)
                : r;
            })
            .reduce($r, []);
        }
        return (
          (r = Array.isArray(r) ? r : r ? [r] : void 0),
          function (t) {
            return (
              r ||
              (function n(i, o) {
                return Object.keys(i).reduce(function (t, e) {
                  var r = o ? "".concat(o, ".").concat(e) : e,
                    e = i[e];
                  return (
                    "object" === Ae(e) &&
                    null !== e &&
                    !Array.isArray(e) &&
                    "[object Function]" !==
                      Object.prototype.toString.call(e.toJSON) &&
                    Object.keys(e).length
                      ? (t = t.concat(n(e, r)))
                      : Array.isArray(e) &&
                        (t.push(r),
                        (t = t.concat(
                          e
                            .map(function (t) {
                              return n(t, r);
                            })
                            .reduce($r, [])
                            .filter(function (t, e, r) {
                              return r.indexOf(t) !== e;
                            })
                        ))),
                    t
                  );
                }, []);
              })(t)
            ).reduce(n, [t]);
          }
        );
      },
    },
    ct = {
      Parser: Ze,
      AsyncParser: Wr,
      Transform: Qe,
      parse: lt,
      parseAsync: pt,
      transforms: De,
    };
  (t.AsyncParser = Wr),
    (t.Parser = Ze),
    (t.Transform = Qe),
    (t.default = ct),
    (t.parse = lt),
    (t.parseAsync = pt),
    (t.transforms = De),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
