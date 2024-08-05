import { getRepository } from "typeorm";
import { User } from "../../src/entity/User";

describe("User Entity", () => {
  it("should create a new user", async () => {
    const userRepository = getRepository(User);

    const newUser = userRepository.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
      provider: "google",
    });

    await userRepository.save(newUser);

    const savedUser = await userRepository.findOne({
      where: { email: "test@example.com" },
    });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe("Test User");
  });
});
