import { Injectable } from "@angular/core";
import { AppService } from "./app.service";
import { AppListing } from "./account/account.component";

@Injectable({
  providedIn: "root"
})
export class ExpanseClientService {
  messageResolves: any;
  isDev: string;
  url: string;
  cdnUrl: string;
  shortenerUrl: string;
  openResolves: any;
  storageKey: string;
  isStarted: boolean;
  isOpen: boolean;
  stateChanged: boolean;
  preventGuest: boolean = true;
  state: any;
  stateWrap: any;
  updateLoopCount: number;
  ws: WebSocket;
  socketId: any;
  currentSession: any;
  installedApps: AppListing[];
  default_app_ulrs: any[] = [];
  constructor(private appService: AppService) {
    this.messageResolves = {}; // localStorage.setItem('isDev','true');
    // localStorage.removeItem("isDev");
    this.isDev = localStorage.getItem("isDev");
    this.url = this.isDev
      ? "ws://192.168.0.4:3000"
      : "wss://api.theexpanse.app";
    this.cdnUrl = this.isDev
      ? "http://192.168.0.4:47000/"
      : "https://cdn.theexpanse.app/";
    this.shortenerUrl = this.isDev
      ? "http://192.168.0.4:47499/"
      : "https://xpan.cc/";
    this.openResolves = [];
    this.storageKey = "";
  }

  setStorageKey(storageKey: string) {
    this.storageKey = storageKey || "";
  }
  onspacedata(data) {}
  ononeshot(data) {}
  onjoined(data) {}
  onalljoined(data) {}
  onleft(data) {}
  onreconnect() {
    this.setupWebsocket();
  }
  onusermessage(data) {}
  start(): Promise<any> {
    if (this.isOpen) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      if (!this.isStarted) {
        this.isStarted = true;
        this.state = this.state || { rig: [0, 0, 0, 0, 0, 0, 0], hands: [0] };
        this.stateChanged = false;
        this.stateWrap = { state: this.state };
        this.setupWebsocket();
        setInterval(() => this.updateLoop(), 200);
        setInterval(() => this.keepAlive(), 10000);
      }
      this.openResolves.push(resolve);
    })
      .then(() => this.refreshSession())
      .catch(e => {
        console.log(e);
      });
  }
  async refreshSession() {
    this.currentSession = await this.getCurrentSession();
    this.appService.isAuthenticated = !!this.currentSession;
  }
  getUserSettings() {
    if (!this.default_app_ulrs || !this.default_app_ulrs.length) {
      return this.start()
        .then(() => this.getUserValues())
        .then((res: any) => {
          (res || []).forEach(
            (setting: { name: string; setting_value: string }) => {
              const parts = setting.name.split("_");
              if (parts[0] === "appUrl") {
                this.default_app_ulrs.push({
                  provider: parts[1],
                  link_url: setting.setting_value
                });
              }
            }
          );
        });
    }
  }
  getInstalledApps(search, page) {
    return this.start()
      .then(() => this.searchInstalledApps(search, page))
      .then((resp: AppListing[]) => {
        this.installedApps = resp;
      });
  }
  updateLoop() {
    this.updateLoopCount = this.updateLoopCount || 0;
    if (this.stateChanged) {
      if (++this.updateLoopCount % 300 === 0) {
        localStorage.setItem(
          "current_rig" + this.storageKey,
          this.state.rig.toString() + "," + new Date().getTime()
        );
      }
      this.emit("state-update", this.stateWrap);
      this.stateChanged = false;
    }
  }
  keepAlive() {
    this.emit("keep-alive", {});
  }
  refreshGuestSession(options) {
    return this.emit("generate-guest-login", options).then((msg: any) => {
      localStorage.setItem("session" + this.storageKey, JSON.stringify(msg));
      localStorage.setItem("guest_token" + this.storageKey, msg.token);
      return msg;
    });
  }
  getGuestSession() {
    const guestToken = localStorage.getItem("guest_token" + this.storageKey);
    if (!guestToken) {
      return this.refreshGuestSession({});
    } else {
      return this.refreshGuestSession({ guestToken });
    }
  }
  getCurrentSession() {
    return new Promise((resolve, reject) => {
      let session: any = localStorage.getItem("session" + this.storageKey);
      if (!session) {
        if (!this.preventGuest) {
          this.getGuestSession().then(resolve);
        } else {
          return reject();
        }
      } else {
        try {
          session = JSON.parse(session);
          setTimeout(() => {
            // console.log('is-websocket-open',this.ws.readyState===this.ws.OPEN)
            this.refresh(session.token).then((msg: any) => {
              if (!msg.error) {
                localStorage.setItem(
                  "session" + this.storageKey,
                  JSON.stringify(msg)
                );
                resolve(msg);
              } else {
                localStorage.removeItem("session" + this.storageKey);
                return reject();
              }
            });
          });
        } catch (e) {
          reject();
        }
      }
    });
  }
  setupWebsocket() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = evt => this.onOpen(evt);
    this.ws.onclose = evt => this.onClose(evt);
    this.ws.onmessage = evt => this.onMessage(evt);
    this.ws.onerror = evt => console.error(evt);
  }
  emit(path, data) {
    return new Promise(resolve => {
      try {
        let token;
        try {
          token = JSON.parse(localStorage.getItem("session" + this.storageKey))
            .token;
        } catch (e) {}
        if (this.isOpen) {
          this.ws.send(
            JSON.stringify({ path: path, data: data, token: token })
          );
        }
        // else {
        //   this.openResolves.push(() => {
        //     this.ws.send(
        //       JSON.stringify({ path: path, data: data, token: token })
        //     );
        //   });
        // }
      } catch (e) {
        console.warn(e);
      }
      this.messageResolves[path] = resolve;
    });
  }
  onOpen(evt) {
    this.openResolves.forEach(fn => fn());
    this.isOpen = true;
    console.log("Connected to Expanse API");
  }
  onClose(evt) {
    console.log("Connection to API closed. Waiting ...");
    this.ws = null;
    this.isStarted = this.isOpen = false;
    this.onreconnect();
  }
  onMessage(evt) {
    try {
      let response = JSON.parse(evt.data);
      let path = response.path;
      if (path.substr(path.length - 4, 4) === "-err") {
        path = path.substr(0, path.length - 4);
        response.data = { error: true, data: response.data };
      }
      if (path === "socketId") {
        this.socketId = response.data;
      } else if (path === "user-joined") {
        this.onjoined(response.data);
      } else if (path === "users-joined") {
        this.onalljoined(response.data);
      } else if (path === "user-left") {
        this.onleft(response.data);
      } else if (path === "user-message") {
        this.onusermessage(response.data);
      } else if (path === "one-shot") {
        this.ononeshot(response.data);
      } else if (path === "space-data") {
        this.onspacedata(response.data);
      } else if (this.messageResolves[path]) {
        this.messageResolves[path](response.data);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  linkSceneToSpace(scenes_id, spaces_id) {
    return this.emit("link-scene-to-space", { scenes_id, spaces_id });
  }
  saveImage(file, token) {
    if (!token) {
      try {
        token = JSON.parse(localStorage.getItem("session" + this.storageKey))
          .token;
      } catch (e) {}
    }
    let formData = new FormData();
    let date = new Date().getTime();
    formData.append("file", file, "selfie.jpg");
    return fetch(
      this.cdnUrl + "create-upload/" + token + "/?" + new Date().getTime()
    )
      .then(res => res.json())
      .then(json =>
        fetch(
          this.cdnUrl +
            "upload-file/" +
            token +
            "/" +
            json.fileId +
            "/selfie-" +
            date +
            ".jpg/jpeg",
          {
            method: "post",
            body: formData
          }
        )
      )
      .then(res => res.json())
      .then(res =>
        this.shortenUrl(
          this.cdnUrl + res.path,
          "e" + res.fileId.toString(36),
          token
        )
      );
  }
  shortenUrl(url, name, token) {
    if (!token) {
      try {
        token = JSON.parse(localStorage.getItem("session" + this.storageKey))
          .token;
      } catch (e) {}
    }
    return fetch(
      this.shortenerUrl +
        "get-link/" +
        token +
        "/" +
        name +
        "/" +
        encodeURIComponent(url)
    )
      .then(res => res.json())
      .then(res => fetch(res.url).then(() => res));
  }
  saveScene(scene, name, scenes_id?) {
    let formData = new FormData();
    formData.append("scene", JSON.stringify(scene));
    let cdnToken, files_id;
    return this.getCurrentSession()
      .then((resp: any) => {
        cdnToken = resp.token;
        if (scenes_id) {
          return this.updateScene(name, scenes_id).then(scenes => {
            files_id = scenes[0].files_id;
          });
        } else {
          return fetch(this.cdnUrl + "create-upload/" + cdnToken + "/")
            .then(res => res.json())
            .then(json => {
              files_id = json.fileId;
              return this.createScene(name, json.fileId, 2);
            })
            .then(scenes => (scenes_id = scenes[0].scenes_id));
        }
      })
      .then(() =>
        fetch(
          this.cdnUrl +
            "upload-scene/" +
            cdnToken +
            "/" +
            files_id +
            "/scene-" +
            scenes_id +
            "/scene_json",
          {
            method: "post",
            body: formData
          }
        )
      )
      .then(() => ({
        scenes_id,
        files_id,
        name,
        scene,
        url: "file/" + files_id + "/scene-" + scenes_id
      }));
  }
  downloadSketchFab(data) {
    return this.getCurrentSession().then((resp: any) => {
      return fetch(
        (this.isDev
          ? "http://192.168.0.4:47000"
          : "https://cdn.theexpanse.app") +
          "/get-sketchfab/" +
          resp.token +
          "/" +
          data.uid +
          "/" +
          data.access_token
      ).then(r => r.json());
    });
  }
  savePrefab(prefab) {
    const formData = new FormData();
    // let file = new Blob([JSON.stringify(prefab)], {type: "application/json"})
    // formData.append("file", file,'prefab.json');
    formData.append("scene", JSON.stringify(prefab));
    let cdnToken, files_id;
    return this.getCurrentSession()
      .then((resp: any) => {
        cdnToken = resp.token;
        return fetch(this.cdnUrl + "create-upload/" + cdnToken + "/")
          .then(res => res.json())
          .then(json => {
            files_id = json.fileId;
          });
      })
      .then(() =>
        fetch(
          this.cdnUrl +
            "upload-scene/" +
            cdnToken +
            "/" +
            files_id +
            "/prefab-" +
            new Date().getTime() +
            "/prefab_json",
          {
            method: "post",
            body: formData
          }
        )
      )
      .then(() => files_id);
  }
  login(login, password) {
    return this.emit("login", { login, password });
  }
  signup(name, email, password, dob) {
    return this.emit("sign-up", { name, email, password, dob });
  }
  refresh(token) {
    return this.emit("refresh", { token });
  }
  getData(socketId) {
    return this.emit("get-data", { socketId });
  }
  searchSubscribedEvents(search, page, events_id?) {
    return this.emit("search-subscribed-event", { search, page, events_id });
  }
  subscribeEvent(events_id) {
    return this.emit("subscribe-event", { events_id });
  }
  unsubscribeEvent(events_id) {
    return this.emit("unsubscribe-event", { events_id });
  }
  getEvent(events_id) {
    return this.emit("event", { events_id });
  }
  getEvents(page, search, filter) {
    return this.emit("events-list", { page, search, filter });
  }
  getMyEvents(page, search, filter) {
    return this.emit("my-events", { page, search, filter });
  }
  getEventTotals(events_id) {
    return this.emit("get-event-totals", { events_id });
  }
  getEventCounters(events_id, start_time, end_time, filter) {
    return this.emit("get-event-counters", {
      events_id,
      start_time,
      end_time,
      filter
    });
  }
  eventCount(type, events_id) {
    return this.emit("update-count-event", { type, events_id });
  }
  getSpace(spaces_id) {
    return this.emit("space", { spaces_id });
  }
  getSpaces(page, search) {
    return this.emit("spaces-list", { page, search });
  }
  getMySpaces(page, search) {
    return this.emit("my-spaces", { page, search });
  }
  searchSubscribedSpaces(search, page, spaces_id?) {
    return this.emit("search-subscribed-space", { search, page, spaces_id });
  }
  subscribeSpace(spaces_id) {
    return this.emit("subscribe-space", { spaces_id });
  }
  unsubscribeSpace(spaces_id) {
    return this.emit("unsubscribe-space", { spaces_id });
  }
  getSpaceTotals(spaces_id) {
    return this.emit("get-space-totals", { spaces_id });
  }
  getSpaceCounters(spaces_id, start_time, end_time, filter) {
    return this.emit("get-space-counters", {
      spaces_id,
      start_time,
      end_time,
      filter
    });
  }
  spaceCount(type, spaces_id) {
    return this.emit("update-count-space", { type, spaces_id });
  }
  createSpace(space) {
    return this.emit("create-space", space);
  }
  updateSpace(space) {
    return this.emit("update-space", space);
  }
  deleteSpace(spaces_id) {
    return this.emit("delete-space", { spaces_id });
  }
  getScenes(page, search, spaces_id) {
    return this.emit("my-scenes", { page, search, spaces_id });
  }
  getScene(scenes_id) {
    return this.emit("scene", { scenes_id });
  }
  createScene(name, files_id, version) {
    return this.emit("create-scene", { name, files_id, version });
  }
  updateScene(name, scenes_id) {
    return this.emit("update-scene", { name, scenes_id });
  }
  getNotifications() {
    return this.emit("get-notifications", {});
  }
  deleteScene(scenes_id) {
    return this.emit("delete-scene", { scenes_id });
  }
  getMyPrefabs(page, search) {
    return this.emit("my-prefabs", { page, search });
  }
  createPrefab(name, description, image, files_id, is_public, obfuscate) {
    return this.emit("create-prefab", {
      name,
      description,
      image,
      files_id,
      is_public,
      obfuscate
    });
  }
  updatePrefab(prefabs_id, name, description, image, is_public, obfuscate) {
    return this.emit("update-prefab", {
      prefabs_id,
      name,
      description,
      image,
      is_public,
      obfuscate
    });
  }
  deletePrefab(prefabs_id) {
    return this.emit("delete-prefab", { prefabs_id });
  }
  getOldBehaviours(behaviours) {
    return this.emit("get-scene-behaviours", {
      behaviours,
      old_id_check: true
    });
  }
  getSceneBehaviours(behaviours) {
    return this.emit("get-scene-behaviours", { behaviours });
  }
  saveSceneBehaviours(behaviours) {
    return this.emit("save-scene-behaviours", { behaviours });
  }
  createBehaviour(
    name,
    description,
    image,
    definition,
    is_public,
    obfuscate,
    sync,
    trigger
  ) {
    return this.emit("create-behaviour", {
      name,
      description,
      image,
      definition,
      is_public,
      obfuscate,
      sync,
      trigger
    });
  }
  updateBehaviour(
    behaviours_id,
    name,
    description,
    image,
    definition,
    is_public,
    obfuscate,
    sync,
    trigger
  ) {
    return this.emit("update-behaviour", {
      behaviours_id,
      name,
      description,
      image,
      definition,
      is_public,
      obfuscate,
      sync,
      trigger
    });
  }
  getBehavioursNotIncluding(page, excluded) {
    return this.emit("behaviours-not-including", { page, excluded });
  }
  getMyBehaviours(page, search) {
    return this.emit("my-behaviours", { page, search });
  }
  deleteBehaviour(behaviours_id) {
    return this.emit("delete-behaviour", { behaviours_id });
  }
  createEvent(event) {
    return this.emit("create-event", event);
  }
  updateEvent(event) {
    return this.emit("update-event", event);
  }
  deleteEvent(events_id) {
    return this.emit("delete-event", { events_id });
  }
  getPeopleInSpace(currentSpace, spaceId, page, search) {
    return this.emit("people-in-space", {
      currentSpace,
      spaceId,
      page,
      search
    });
  }
  getFriends(page, search) {
    return this.emit("friends", { page, search });
  }
  addFriend(userId) {
    return this.emit("add-friend", { userId });
  }
  removeFriend(userId) {
    return this.emit("reject-request", { userId });
  }
  getFriendRequests(page, search) {
    return this.emit("requests", { page, search });
  }
  acceptFriendRequest(userId) {
    return this.emit("accept-request", { userId });
  }
  rejectFriendRequest(userId) {
    return this.emit("reject-request", { userId });
  }
  getBlocked(page, search) {
    return this.emit("blocked", { page, search });
  }
  blockUser(userId, type) {
    return this.emit("block-user", { userId, type });
  }
  unBlockUser(userId) {
    return this.emit("unblock-user", { userId });
  }
  reportUser(userId, type, details) {
    return this.emit("report-user", { userId, type, details });
  }
  getMessagesPeople(page, search) {
    return this.emit("messages-people", { page, search });
  }
  getMessagesThread(userId, page, search) {
    return this.emit("messages-thread", { userId, page, search });
  }
  inviteUser(userId, space) {
    this.emit("user-message", {
      users_id: userId,
      message: {
        text: "Come visit me at " + space.name + "!!!",
        spaces_id: space.spaces_id
      }
    });
  }
  sendMessage(userId, message) {
    this.emit("user-message", { users_id: userId, message: { text: message } });
    return this.emit("send-message", { userId, message });
  }
  forgotPassword(email, returnUrl) {
    return this.emit("forgot-password", { email, returnUrl });
  }
  resetPassword(password, resetToken) {
    return this.emit("reset-password", { password, resetToken });
  }
  getUserWithSpace() {
    return this.emit("get-user-with-space", {});
  }
  getUserCurrentSpace(users_id) {
    return this.emit("get-user-current-space", { users_id });
  }
  saveUserDetails(name, email) {
    return this.emit("save-user-details", { name, email });
  }
  saveUserDefaultSpace(spaceId) {
    return this.emit("save-user-default-space", { spaceId });
  }
  saveUserPassword(password) {
    return this.emit("save-user-password", { password });
  }
  getAvatarImages(avatar_images_id?) {
    return this.emit("get-avatar-images", { avatar_images_id });
  }
  setUserAvatarImage(avatar_images_id) {
    return this.emit("set-user-avatar-image", { avatar_images_id });
  }
  setUserAvatarMesh(type) {
    return this.emit("set-user-avatar-mesh", { type });
  }
  saveAvatarImage(image, preview) {
    return this.emit("save-avatar-images", { image, preview });
  }
  deleteAvatarImage(avatar_images_id) {
    return this.emit("delete-avatar-images", { avatar_images_id });
  }
  setDefaultAvatar(geometry, texture) {
    return this.emit("set-default-avatar", { geometry, texture });
  }
  getUserTimezone(users_id) {
    return this.emit("get-user-timezone", { users_id });
  }
  getRelated(users_id) {
    return this.emit("get-related", { users_id });
  }
  setSpace(spaces_id) {
    return this.emit("set-space", { spaces_id });
  }
  oneShot(data) {
    return this.emit("one-shot", data);
  }
  syncObject(data) {
    return this.emit("sync-object", data);
  }
  removeUserValue(key) {
    return this.emit("remove-user-value", { key });
  }
  getUserValues() {
    return this.emit("get-user-values", {});
  }
  setUserValues(keyValues) {
    return this.emit("set-user-values", { keyValues });
  }
  heartBeat() {
    return this.emit("heart-beat", {});
  }
  deleteApp(apps_id) {
    return this.emit("delete-app", { apps_id });
  }
  getAppUpdates(apps_ids) {
    return this.emit("get-app-updates", { apps_ids });
  }
  getAppPackage(packagename) {
    return this.emit("get-app-package", { packagename });
  }
  getApp(apps_id) {
    return this.emit("get-app", { apps_id });
  }
  getAppTotals(apps_id) {
    return this.emit("get-app-totals", { apps_id });
  }
  getAppCounters(apps_id, start_time, end_time, filter) {
    return this.emit("get-app-counters", {
      apps_id,
      start_time,
      end_time,
      filter
    });
  }
  getAppUrls(apps_id) {
    return this.emit("get-app-urls", { apps_id });
  }
  getAppScreenshots(apps_id) {
    return this.emit("get-app-screenshots", { apps_id });
  }
  searchApps(search, page, order, direction, app_categories_id?) {
    return this.emit("search-apps", {
      search,
      page,
      order,
      direction,
      app_categories_id
    });
  }
  searchMyApps(search, page) {
    return this.emit("search-my-apps", { search, page });
  }
  searchInstalledApps(search, page, is_updated?, is_uninstalled?, apps_id?) {
    return this.emit("search-installed-apps", {
      search,
      page,
      is_updated,
      is_uninstalled,
      apps_id
    });
  }
  addInstalledApp(apps_id, versioncode) {
    return this.emit("add-edit-installed-app", { apps_id, versioncode });
  }
  uninstallApp(apps_id) {
    return this.emit("uninstall-app", { apps_id });
  }
  getAppWebhook(apps_id) {
    return this.emit("get-app-webhook", { apps_id });
  }
  addApp(
    name,
    image_url,
    video_url,
    comfort,
    summary,
    description,
    apk_url,
    packagename,
    versioncode,
    versionname,
    license,
    website,
    donate_url,
    github_name,
    github_repo,
    github_tag,
    github_enabled,
    app_categories_id,
    screenshots,
    supports_quest,
    supports_go,
    supports_other,
    search_tags,
    app_urls,
    early_access
  ) {
    return this.editApp(
      null,
      name,
      image_url,
      video_url,
      comfort,
      summary,
      description,
      apk_url,
      packagename,
      versioncode,
      versionname,
      license,
      website,
      donate_url,
      github_name,
      github_repo,
      github_tag,
      github_enabled,
      app_categories_id,
      screenshots,
      supports_quest,
      supports_go,
      supports_other,
      search_tags,
      app_urls,
      early_access
    );
  }
  editApp(
    apps_id,
    name,
    image_url,
    video_url,
    comfort,
    summary,
    description,
    apk_url,
    packagename,
    versioncode,
    versionname,
    license,
    website,
    donate_url,
    github_name,
    github_repo,
    github_tag,
    github_enabled,
    app_categories_id,
    screenshots,
    supports_quest,
    supports_go,
    supports_other,
    search_tags,
    app_urls,
    early_access
  ) {
    return this.emit("add-edit-app", {
      apps_id,
      name,
      image_url,
      video_url,
      comfort,
      summary,
      description,
      apk_url,
      packagename,
      versioncode,
      versionname,
      license,
      website,
      donate_url,
      github_name,
      github_repo,
      github_tag,
      github_enabled,
      app_categories_id,
      screenshots,
      supports_quest,
      supports_go,
      supports_other,
      search_tags,
      app_urls,
      early_access
    });
  }
  appCount(type, apps_id) {
    return this.emit("update-count-app", { type, apps_id });
  }
}
