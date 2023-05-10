const Page = require("./utils");

class NotificationsPage extends Page {
  get notificationList() {
    return $("div.notification-list");
  }

  get notificationItem() {
    return $("div.notification-item");
  }

  async open() {
    await browser.url("http://167.114.201.175:5000/notifications");
    await browser.pause(5000);
  }

  async checkNotificationListExist() {
    await expect(this.notificationList).toExist();
  }

  async checkNotificationItemExist() {
    await expect(this.notificationItem).toExist();
  }
}

module.exports = new NotificationsPage();
