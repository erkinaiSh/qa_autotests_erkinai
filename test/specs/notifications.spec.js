const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const NotificationsPage = require("../pages/NotificationsPage");

describe("Notifications Page", function () {
  beforeEach(async function () {
    await LoginPage.open();
    await LoginPage.login("username", "password");
    await NotificationsPage.open();
  });

  afterEach(async function () {
    await NotificationsPage.logout();
  });

  it("should display notifications table", async function () {
    const table = await NotificationsPage.getTable();
    assert.ok(await table.isDisplayed(), "Table is not displayed");
  });

  it("should display notifications table columns", async function () {
    const expectedColumns = ["ID", "Date", "Message"];
    const tableColumns = await NotificationsPage.getTableColumns();
    assert.deepEqual(
      tableColumns,
      expectedColumns,
      "Table columns are incorrect"
    );
  });

  it("should display notifications", async function () {
    const expectedNotifications = [
      "Notification 1",
      "Notification 2",
      "Notification 3",
    ];
    const notifications = await NotificationsPage.getNotifications();
    assert.deepEqual(
      notifications,
      expectedNotifications,
      "Notifications are incorrect"
    );
  });

  it("should mark notification as read", async function () {
    const notification = await NotificationsPage.getNotification(0);
    const originalStatus = await notification.getStatus();
    await notification.markAsRead();
    const newStatus = await notification.getStatus();
    assert.notEqual(
      originalStatus,
      newStatus,
      "Notification status was not updated"
    );
  });

  it("should delete notification", async function () {
    const notificationsCount = await NotificationsPage.getNotificationsCount();
    await NotificationsPage.deleteNotification(0);
    const newNotificationsCount =
      await NotificationsPage.getNotificationsCount();
    assert.equal(
      newNotificationsCount,
      notificationsCount - 1,
      "Notification was not deleted"
    );
  });
});
