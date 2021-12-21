import { shallowMount, Wrapper } from "@vue/test-utils";
import Pagination from "@/transaction/comopnents/Pagination.vue";

let wrapper: Wrapper<Pagination>;
describe("Pagination", () => {
  beforeEach(() => {
    wrapper = shallowMount(Pagination, {
      propsData: {
        transactionCount: 10,
      },
    });
  });

  it("can change data count", async () => {
    const options = wrapper.find("select").findAll("option");
    await options.at(3).setSelected();

    expect(wrapper.emitted("handleCountChange")).toHaveLength(1);
    expect((wrapper.vm as any).take).toBe(50);
  });

  it("prev button is disabled when skip is 0", async () => {
    const prev = wrapper.find(".prev");
    await wrapper.setData({
      skip: 0,
      take: 10,
    });
    prev.trigger("click");
    expect((wrapper.vm as any).skip).toBe(0);
  });

  it("prev button is enabled when skip is > 0", async () => {
    const prev = wrapper.find(".prev");
    await wrapper.setData({
      skip: 20,
      take: 10,
    });
    await prev.trigger("click");
    expect((wrapper.vm as any).skip).toBe(10);
  });

  it("next button is enabled", async () => {
    const next = wrapper.find(".next");
    await wrapper.setData({
      skip: 0,
      take: 10,
    });
    await next.trigger("click");
    expect((wrapper.vm as any).skip).toBe(10);
  });
});
