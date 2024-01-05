import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';
import { LogEntity } from '../../../../src/domain/entities/log.entity';





describe('Check Service', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should class successCallback when fecth returns true', async () => {

        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBeTruthy();
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalledTimes(0);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })

    test('should class successCallback when fecth returns false', async () => {

        const wasOk = await checkService.execute('https://googler.com')

        expect(wasOk).toBeFalsy();
        expect(wasOk).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })
})